import http from "../http";
import { FlightState } from "@/types/flights/states.interface";

export const getStateByIcao = async (icao24: string): Promise<FlightState> => {
  console.log("icao24", icao24);

  const { data } = await http.get("/states/all", {
    params: {
      icao24,
    },
  });

  return data;
};
