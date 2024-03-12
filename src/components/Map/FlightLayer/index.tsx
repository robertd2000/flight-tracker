import { getStateByIcao } from "@/api/flights/states.api";
import { useQuery } from "@tanstack/react-query";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useState } from "react";
import { RFeature, RLayerVector, ROverlay } from "rlayers";

export const FlightLayer = () => {
  //   const [moduleFeatures, setModuleFeatures] = useState<Feature[]>([]);
  const [moduleFeature, setModuleFeature] = useState<Feature>();
  const [coords, setCoords] = useState<number[]>([0, 0]);

  useQuery({
    queryKey: ["getStateByIcao"],
    queryFn: async () => {
      const data = await getStateByIcao("4009d8");

      if (data && data?.states?.length) {
        const featureData = data?.states?.[0];
        const longitude = featureData?.[5];
        const latitude = featureData?.[6];
        console.log("data", data.states);
        console.log("longitude, latitude", longitude, latitude);

        const point = new Point(fromLonLat([longitude, latitude]));
        const f = new Feature({
          data: data?.states?.[0],
          // name: originalData.find(
          //   (v) => v.navigation && v.id === moduleData.id
          // ).name,
          geometry: point,
        });

        setCoords([longitude, latitude]);
        setModuleFeature(f);
      }

      return data;
    },
    refetchInterval: 150000,
    refetchOnWindowFocus: false,
  });

  return (
    <RLayerVector zIndex={10}>
      <RFeature geometry={new Point(fromLonLat(coords))}>
        <ROverlay className="no-interaction"></ROverlay>
      </RFeature>
    </RLayerVector>
  );
};
