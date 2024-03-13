import http from "../http";
import { FlightState, Limit } from "@/types/flights/states.interface";

export const getStates = async (limit: Limit): Promise<FlightState> => {
  const { data } = await http.get("/states/all", {
    params: {
      ...limit,
    },
  });

  return data;
};

export const getStateByIcao = async (icao24: string): Promise<FlightState> => {
  const { data } = await http.get("/states/all", {
    params: {
      icao24,
    },
  });

  return data;
};
