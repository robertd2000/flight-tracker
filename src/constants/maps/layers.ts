import { MapLayer } from "../../components/Map/MainMap/types/layers";

export const mapLayers: MapLayer[] = [
  {
    type: "tile",
    value: "openTopo",
    properties: { label: "OpenTopo" },
    url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attributions:
      "Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)",
    visible: false,
  },
  {
    type: "tile",
    value: "transport",
    properties: { label: "Transport" },
    url: "http://tile.thunderforest.com/transport/{z}/{x}/{y}.png",
    visible: false,
  },
  {
    type: "stadia",
    value: "stadiaTerrainBackground",
    properties: { label: "Stadia Terrain Background" },
    layer: "stamen_terrain_background",
    visible: false,
  },
];
