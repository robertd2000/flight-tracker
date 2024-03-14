import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toLonLat } from "ol/proj";
import { RView } from "node_modules/rlayers/RMap";
import { initialMapData } from "../../components/Map/MainMap/constants/initial";
import { RLayerVector } from "rlayers";

export const useMapCoords = () => {
  const [view, setView] = useState<RView>(initialMapData);
  const [searchParams, setSearchParams] = useSearchParams();

  const flightVectorLayer = useRef<RLayerVector>();

  const [lon, lat] = view.center;

  const onSetView = useCallback(
    (view: RView) => {
      setView(view);

      const [lon, lat] = toLonLat(view.center);

      searchParams.set("lon", lon.toString());
      searchParams.set("lat", lat.toString());
      searchParams.set("zoom", `${view.zoom}`);

      setSearchParams(searchParams);
    },
    [lon, lat]
  );

  const getCoords = () => {
    const lon = searchParams.get("lon") || 0;
    const lat = searchParams.get("lat") || 0;
    const zoom = searchParams.get("zoom") || 1;

    const lamin = +lat - (1 / +zoom) * 10;
    const lamax = +lat + (1 / +zoom) * 10;
    const lomin = +lon - (1 / +zoom) * 15;
    const lomax = +lon + (1 / +zoom) * 15;

    return {
      lon,
      lat,
      zoom,
      lamax,
      lamin,
      lomax,
      lomin,
    };
  };
  return {
    view,
    flightVectorLayer,
    getCoords,
    onSetView,
  };
};
