import { localStorageController } from "@/utils/localStorage";
import { fromLonLat } from "ol/proj";

export const getInitialData = () => {
  const lon = localStorageController.getItem("lon");
  const lat = localStorageController.getItem("lat");
  const zoom = localStorageController.getItem("zoom") as number;

  return {
    center: fromLonLat([(lon as number) || 2.364, (lat as number) || 48.82]),
    zoom: +zoom,
  };
};
