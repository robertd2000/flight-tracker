import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";
import { RFeature, RFeatureUIEvent, RLayerCluster, RMap } from "rlayers";
import { FlightInfo } from "@/components/FlightInfo";
import { useSingleFlight } from "./hooks/useSingleFlight";
import { useFlights } from "./hooks/useFlights";
import { AircraftCategories } from "@/constants/flights/categories";
import { RefObject, memo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const FlightsLayer = memo(({ mapRef }: { mapRef: RefObject<RMap> }) => {
  const { flightFeatures } = useFlights();

  const {
    flightData,
    isSheetOpen,
    icao,
    icaoInput,
    setIcaoInput,
    onSheetOpen,
    onSetIcao,
  } = useSingleFlight(mapRef);

  return (
    <>
      <FlightInfo
        flightData={flightData}
        isSheetOpen={isSheetOpen}
        onSheetOpen={onSheetOpen}
      />

      <div className="flex w-full max-w-sm items-center space-x-2 absolute top-2 right-[15rem] z-50">
        <Input
          value={icaoInput}
          onChange={(e) => setIcaoInput(e.target.value)}
          placeholder="Искать по icao24"
        />
        <Button type="submit" onClick={() => onSetIcao({ icao24: icaoInput })}>
          Поиск
        </Button>
      </div>

      <RLayerCluster
        distance={30}
        style={useCallback(
          (feature: FeatureLike, resolution: number) => {
            const scaleFactor = resolution < 1 ? 0.5 : 0.4;

            const featureData =
              feature.getProperties().features[0].values_.data;

            const imageSrc =
              featureData.icao24 == icao
                ? new URL(`../../../assets/green_plane.png`, import.meta.url)
                    .href
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
          },
          [icao]
        )}
        properties={{
          name: "flights",
        }}
        zIndex={100}
        onClick={useCallback(
          (e: RFeatureUIEvent) => {
            const { icao24 } =
              e.target.getProperties().features[0].values_.data;
            onSheetOpen(true);
            onSetIcao({
              icao24,
            });
          },
          [onSetIcao, onSheetOpen]
        )}
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
