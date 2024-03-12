import "ol/ol.css";

import { RLayerTile, RMap, ROSM } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { SelectMap } from "@/components/SelectMap";
import { useSelectMap } from "./hooks/useSelectMap";
import { initialMapData } from "./constants/initial";
import style from "@/styles/maps/mainMap.module.scss";

export const MainMap = () => {
  const { visibleLayers, handleSelectMap } = useSelectMap();

  return (
    <RMap
      className={style.mainMap}
      initial={initialMapData}
      minZoom={3}
      maxZoom={18}
      projection={"EPSG:3857"}
    >
      <ROSM properties={{ label: "OpenStreetMap" }} />

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
