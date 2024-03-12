import { MapLayer } from "../types/layers";

export const mapLayers: MapLayer[] = [
  {
    type: "tile",
    value: "openTopo",
    properties: { label: "OpenTopo" },
    url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attributions:
      "Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)",
  },
  {
    type: "tile",
    value: "transport",
    properties: { label: "Transport" },
    url: "http://tile.thunderforest.com/transport/{z}/{x}/{y}.png",
  },
  {
    type: "stadia",
    value: "stadiaTerrainBackground",
    properties: { label: "Stadia Terrain Background" },
    layer: "stamen_terrain_background",
  },
];
