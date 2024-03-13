import { RView } from "node_modules/rlayers/RMap";
import { useState } from "react";
import { initialMapData } from "../../components/Map/MainMap/constants/initial";
import { useSearchParams } from "react-router-dom";
import { toLonLat } from "ol/proj";

export const useMapCoords = () => {
  const [view, setView] = useState<RView>(initialMapData);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSetView = (view: RView) => {
    setView(view);

    console.log("view", view);

    const [lon, lat] = toLonLat(view.center);

    searchParams.set("lon", lon.toString());
    searchParams.set("lat", lat.toString());
    searchParams.set("zoom", `${view.zoom}`);

    setSearchParams(searchParams);
  };

  const getCoords = () => {
    const lon = searchParams.get("lon") || 0;
    const lat = searchParams.get("lat") || 0;
    const zoom = searchParams.get("zoom") || 1;

    const lamin = +lat - 0.5 / +zoom;
    const lamax = +lat + 0.5 / +zoom;
    const lomin = +lon - 1 / +zoom;
    const lomax = +lon + 1 / +zoom;

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
    getCoords,
    onSetView,
  };
};
