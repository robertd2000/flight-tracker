import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";
import { RFeature, RFeatureUIEvent, RLayerCluster } from "rlayers";
import { FlightInfo } from "@/components/FlightInfo";
import { useSingleFlight } from "./hooks/useSingleFlight";
import { useFlights } from "./hooks/useFlights";
import { AircraftCategories } from "@/constants/flights/categories";
import { memo, useCallback } from "react";

export const FlightsLayer = memo(() => {
  const { flightFeatures } = useFlights();

  const { flightData, isSheetOpen, icao, onSheetOpen, onSetIcao } =
    useSingleFlight();

  return (
    <>
      <FlightInfo
        flightData={flightData}
        isSheetOpen={isSheetOpen}
        onSheetOpen={onSheetOpen}
      />

      <RLayerCluster
        distance={30}
        style={useCallback((feature: FeatureLike, resolution: number) => {
          const scaleFactor = resolution < 1 ? 0.5 : 0.4;

          const featureData = feature.getProperties().features[0].values_.data;

          const imageSrc =
            featureData.icao24 == icao
              ? new URL(`../../../assets/green.png`, import.meta.url).href
              : new URL(
                  `../../../assets/${
                    AircraftCategories[featureData?.category]
                  }.png`,
                  import.meta.url
                ).href;

          return new Style({
            image: new Icon({
              src: imageSrc,
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              rotation: (featureData?.rotation * Math.PI) / 180,
              scale: scaleFactor,
            }),
          });
        }, [])}
        properties={{
          name: "flights",
        }}
        zIndex={100}
        onClick={useCallback((e: RFeatureUIEvent) => {
          const { icao24, latitude, longitude } =
            e.target.getProperties().features[0].values_.data;
          onSheetOpen(true);
          onSetIcao({
            icao24,
            latitude,
            longitude,
          });
        }, [])}
      >
        {flightFeatures
          .filter((i) => i != null)
          .map((feature, index) => {
            return <RFeature feature={feature as Feature} key={index} />;
          })}
      </RLayerCluster>
    </>
  );
});
