import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toLonLat } from "ol/proj";
import { RMap } from "rlayers";
import { RView } from "node_modules/rlayers/RMap";
import { initialMapData } from "../../components/Map/MainMap/constants/initial";

export const useMapCoords = () => {
  const mapRef = useRef<RMap>(null);

  const [view, setView] = useState<RView>(initialMapData);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSetView = useCallback(
    (view: RView) => {
      setView(view);

      const [lon, lat] = toLonLat(view.center);

      searchParams.set("lon", lon.toString());
      searchParams.set("lat", lat.toString());
      searchParams.set("zoom", `${view.zoom}`);
      searchParams.set("resolution", `${view.resolution}`);

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const getCoords = useCallback(() => {
    const lon = searchParams.get("lon") || 0;
    const lat = searchParams.get("lat") || 0;
    const zoom = searchParams.get("zoom") || 1;
    const resolution = searchParams.get("resolution") || 1;

    const latOff = +resolution! / 500;
    const lonOff = +resolution! / 150;

    const lamin = +lat - latOff;
    const lamax = +lat + latOff;
    const lomin = +lon - lonOff;
    const lomax = +lon + lonOff;

    return {
      lon,
      lat,
      zoom,
      lamax,
      lamin,
      lomax,
      lomin,
    };
  }, [searchParams]);

  return {
    view,
    mapRef,
    getCoords,
    onSetView,
  };
};
