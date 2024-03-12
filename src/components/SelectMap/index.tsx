import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mapLayers } from "@/constants/maps/layers";
import { SelectMapProps } from "./SelectMap.interface";

export const SelectMap: FC<SelectMapProps> = ({ handleSelectMap }) => {
  return (
    <div className="ol-change-map">
      <Select onValueChange={handleSelectMap}>
        <SelectTrigger className="w-[12rem]">
          <SelectValue placeholder="Select a map" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Maps</SelectLabel>
            <SelectItem value={"ol"}>OpenStreetMap</SelectItem>
            {mapLayers.map((layer) => (
              <SelectItem key={layer.value} value={layer.value}>
                {layer?.properties?.label as string}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
