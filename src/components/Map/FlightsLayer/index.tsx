import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";
import { RFeature, RLayerCluster } from "rlayers";
import { FlightInfo } from "@/components/FlightInfo";
import { useSingleFlight } from "./hooks/useSingleFlight";
import { useFlights } from "./hooks/useFlights";
import { AircraftCategories } from "@/constants/flights/categories";

export const FlightsLayer = () => {
  const { moduleFeatures } = useFlights();

  const { flightData, isSheetOpen, onSheetOpen, setIcao } = useSingleFlight();

  return (
    <>
      <FlightInfo
        flightData={flightData}
        isSheetOpen={isSheetOpen}
        onSheetOpen={onSheetOpen}
      />

      <RLayerCluster
        distance={35}
        style={(feature: FeatureLike, resolution: number) => {
          const scaleFactor = resolution < 1 ? 0.5 : 0.4;

          const featureData = feature.getProperties().features[0].values_.data;

          return new Style({
            image: new Icon({
              src: new URL(
                `../../../assets/${
                  AircraftCategories[featureData?.category]
                }.png`,
                import.meta.url
              ).href,
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              rotation: (featureData?.rotation * Math.PI) / 180,
              scale: scaleFactor,
            }),
          });
        }}
        properties={{
          name: "flights",
        }}
        zIndex={100}
        onClick={(e) => {
          onSheetOpen(true);
          setIcao(e.target.getProperties().features[0].values_.data?.icao24);
          console.log(e.target.getProperties().features[0].values_.data);
        }}
      >
        {moduleFeatures.map((feature: Feature, index) => {
          return <RFeature feature={feature} key={index} />;
        })}
      </RLayerCluster>
    </>
  );
};
