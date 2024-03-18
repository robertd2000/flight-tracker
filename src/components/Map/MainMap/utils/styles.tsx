import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
/**
 * Стиль кластера
 * @param feature - метка карты
 * @param resolution - разрешенеи карты
 * @param modulesOriginalData - данные всех модулей
 */
export const getClusterStyle = (feature: any, resolution: any) => {
  const size = feature.get("features").length;

  if (size < 2) {
    const moduleData = feature.getProperties().features[0].values_.data;
    return getModuleStyle(moduleData, resolution);
  }

  return [
    new Style({
      image: new Icon({
        anchor: [16, 27],
        anchorXUnits: "pixels",
        anchorYUnits: "pixels",
        rotation: (270 * Math.PI) / 180,
        src: new URL("../../../../assets/airplane.jpeg").href,
      }),
    }),
    new Style({
      image: new CircleStyle({
        radius: 12,
        fill: new Fill({
          color: "#2680eb",
        }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({
          color: "white",
        }),
        font: "Bold 10px RobotoRegular, sans-serif",
      }),
    }),
  ];
};

/**
 * Стиль модуля для openlayers
 * @param moduleData - данные конкретного модуля
 * @param modulesOriginalData - данные всех модулей
 * @param resolution - разрешение карты
 */
const getModuleStyle = (moduleData: any, resolution: number) => {
  console.log(
    "moduleData",
    moduleData,
    new URL("../../../../assets/airplane.jpeg", import.meta.url).href
  );

  const scaleFactor = resolution < 1 ? 1.5 : 1;

  const moduleCourse = moduleData?.[9] <= 180 ? "r" : "l";
  return [
    new Style({
      image: new Icon({
        src: new URL("../../../../assets/airplane.jpeg", import.meta.url).href,
        rotation: ((moduleCourse === "r" ? 90 : 270) * Math.PI) / 180,
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        scale: scaleFactor,
      }),
      text: new Text({
        offsetY: -20,
        offsetX: 0,
        fill: new Fill({ color: "#000" }),
        stroke: new Stroke({ color: "#fff", width: 2 }),
        font: "Bold 12px Roboto, sans-serif",
      }),
    }),
    new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        rotation: (moduleData?.[9] * Math.PI) / 180,

        scale: 1.1,
      }),
    }),
  ];
};
