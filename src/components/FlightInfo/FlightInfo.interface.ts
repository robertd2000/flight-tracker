import { FlightData } from "@/types/flights/states.interface";

export interface FlightInfoProps {
  flightData: FlightData | null;
  isSheetOpen: boolean;
  onSheetOpen: (e: boolean) => void;
}
