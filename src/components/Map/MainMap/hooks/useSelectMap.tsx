import { useState } from "react";
import { mapLayers } from "@/constants/maps/layers";

export const useSelectMap = () => {
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

  return {
    visibleLayers,
    handleSelectMap,
  };
};
