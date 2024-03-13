import { FlightData, FlightStates } from "@/types/flights/states.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSingleFlight = () => {
  const [flightData, setflightData] = useState<FlightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [icao, setIcao] = useState<string | null>(null);

  const onSheetOpen = (e: boolean) => {
    setIsSheetOpen(e);

    if (!e) setIcao(null);
  };
  console.log(icao);

  useQuery({
    queryKey: ["getStateByIcao"],
    queryFn: async () => {
      // const data = await getStateByIcao(icao24);

      const data = {
        states: [
          [
            "4b1805",
            "SWR2DV  ",
            "Switzerland",
            1710321569,
            1710321569,
            5.3823,
            52.1946,
            4678.68,
            false,
            186.64,
            128.73,
            10.73,
            null,
            4739.64,
            "1000",
            false,
            0,
          ],
        ],
      };
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
    refetchInterval: 150000,
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
