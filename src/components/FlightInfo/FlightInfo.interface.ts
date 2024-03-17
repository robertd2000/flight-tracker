import { FlightData } from "@/types/flights/states.interface";

export interface FlightInfoProps {
  flightData: FlightData | null;
  isSheetOpen: boolean;
  isLoading: boolean;
  onSheetOpen: (e: boolean) => void;
}
