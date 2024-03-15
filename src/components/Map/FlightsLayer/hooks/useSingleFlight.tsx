import { useState } from "react";
import { FlightData, FlightStates } from "@/types/flights/states.interface";
import { useQuery } from "@tanstack/react-query";
import { getStateByIcao } from "@/api/flights/states.api";

export const useSingleFlight = () => {
  const [flightData, setflightData] = useState<FlightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [icao, setIcao] = useState<string | null>(null);

  const onSheetOpen = (e: boolean) => {
    setIsSheetOpen(e);

    if (!e) setIcao(null);
  };

  useQuery({
    queryKey: ["getStateByIcao"],
    queryFn: async () => {
      const data = await getStateByIcao(icao as string);

      if (data && data?.states?.length) {
        const [
          icao24,
          callsign,
          origin_country,
          time_position,
          last_contact,
          longitude,
          latitude,
          baro_altitude,
          on_ground,
          velocity,
          true_track,
          vertical_rate,
          sensors,
          geo_altitude,
          squawk,
          spi,
          // position_source,
          category,
        ] = data?.states?.[0] as FlightStates;

        setflightData({
          icao24,
          callsign,
          origin_country,
          time_position,
          last_contact,
          longitude,
          latitude,
          baro_altitude,
          on_ground,
          velocity,
          true_track,
          vertical_rate,
          sensors,
          geo_altitude,
          squawk,
          spi,
          // position_source,
          category,
        });
      }

      return data;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
    enabled: !!icao,
  });

  return {
    flightData,
    isSheetOpen,
    onSheetOpen,
    setIcao,
  };
};
