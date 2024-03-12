import { RLayerTileProps } from "rlayers";

export type MapLayerTypes = "tile" | "stadia";

export interface MapLayer extends RLayerTileProps {
  value: string;
  type: MapLayerTypes;
  layer?: string;
  visible?: boolean;
}
