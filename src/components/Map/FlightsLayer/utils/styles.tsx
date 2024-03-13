import { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";
import { AircraftCategories } from "@/constants/flights/categories";

export const getStyles = (feature: FeatureLike, resolution: number) => {
  const scaleFactor = resolution < 1 ? 0.5 : 0.4;

  const featureData = feature.getProperties().features[0].values_.data;

  console.log("featureData", featureData);

  return new Style({
    image: new Icon({
      src: new URL(
        `../../../assets/${AircraftCategories[featureData?.category]}.png`,
        import.meta.url
      ).href,
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      rotation: (featureData?.rotation * Math.PI) / 180,
      scale: scaleFactor,
    }),
  });
};
