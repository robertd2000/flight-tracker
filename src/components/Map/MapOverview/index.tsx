import { RControl, ROSM } from "rlayers";
import style from "@/styles/maps/mapOverview.module.scss";

export const MapOverview = () => {
  return (
    <RControl.ROverviewMap
      //   className="ol-overviewmap example-overview"
      collapsed={false}
      className={"ol-overviewmap " + style.overviewMap}
    >
      <ROSM />
    </RControl.ROverviewMap>
  );
};
