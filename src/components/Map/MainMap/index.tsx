import "ol/ol.css";

import { RControl, RLayerTile, RMap, ROSM } from "rlayers";
import { initialMapData } from "./constants/initial";
import style from "@/styles/maps/mainMap.module.scss";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { useState } from "react";
import { mapLayers } from "./constants/layers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MainMap = () => {
  const [visibleLayers, setVisibleLayers] = useState(mapLayers);

  const handleSelectMap = (e: string) => {
    setVisibleLayers((layers) => {
      return layers?.map((layer) => {
        if (layer.value === e) {
          return {
            ...layer,
            visible: true,
          };
        }

        return { ...layer, visible: false };
      });
    });
  };

  return (
    <RMap
      className={style.mainMap}
      initial={initialMapData}
      minZoom={3}
      maxZoom={18}
      projection={"EPSG:3857"}
    >
      {/* <RControl.RLayers element={layersButton} className="right-0 m-2"> */}
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
      {/* </RControl.RLayers> */}
      <div className="ol-change-map">
        <Select onValueChange={handleSelectMap}>
          <SelectTrigger className="w-[12rem]">
            <SelectValue placeholder="Select a map" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Maps</SelectLabel>
              <SelectItem value={"ol"}>OpenStreetMap</SelectItem>
              {mapLayers.map((layer) => (
                <SelectItem key={layer.value} value={layer.value}>
                  {layer?.properties?.label as string}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </RMap>
  );
};
