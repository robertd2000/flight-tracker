import "ol/ol.css";

import { RControl, RLayerTile, RMap, ROSM } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { SelectMap } from "@/components/SelectMap";
import { FlightsLayer } from "../FlightsLayer";
import { useSelectMap } from "./hooks/useSelectMap";
import { useMapCoords } from "../../../hooks/map/useMapCoords";
import style from "@/styles/maps/mainMap.module.scss";

export const MainMap = () => {
  const { view, onSetView } = useMapCoords();
  const { visibleLayers, handleSelectMap } = useSelectMap();

  return (
    <RMap
      className={style.mainMap}
      initial={view}
      minZoom={7}
      maxZoom={18}
      projection={"EPSG:3857"}
      view={[view, onSetView]}
    >
      <ROSM properties={{ label: "OpenStreetMap" }} />
      {/*  */}
      <FlightsLayer />
      {/*  */}
      <RControl.RScaleLine />
      <RControl.RZoom />
      <RControl.RZoomSlider />
      <RControl.RFullScreen
        // A custom-looking full-screen control
        // Take a look at index.html and example.css
        tipLabel=" "
        className={style.fullScreen}
        // source="fullscreen"
      />

      {visibleLayers?.map((layer) => {
        if (layer.type === "tile")
          return <RLayerTile key={layer.value} {...layer} />;
        if (layer.type === "stadia")
          return (
            <RLayerStadia
              key={layer.value}
              properties={layer.properties}
              layer={layer.layer as string}
              visible={layer.visible}
            />
          );
      })}
      <SelectMap handleSelectMap={handleSelectMap} />
    </RMap>
  );
};
