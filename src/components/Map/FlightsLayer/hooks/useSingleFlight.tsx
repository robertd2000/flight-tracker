import { RefObject, useState } from "react";
import { FlightData, FlightStates } from "@/types/flights/states.interface";
import { useQuery } from "@tanstack/react-query";
import { flightSingleData } from "@/mocs/flights";
import { RMap } from "rlayers";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";

export const useSingleFlight = (mapRef: RefObject<RMap>) => {
  const [flightData, setflightData] = useState<FlightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [icao, setIcao] = useState<string | null>(null);

  const onSheetOpen = (e: boolean) => {
    setIsSheetOpen(e);

    if (!e) setIcao(null);
  };

  const onSetIcao = ({
    icao24,
    latitude,
    longitude,
  }: {
    icao24: string;
    longitude: number;
    latitude: number;
  }) => {
    setIcao(icao24);
    const center = fromLonLat([longitude, latitude]);
    const polygon = new Polygon([[center]]);

    mapRef.current?.ol.getView().fit(polygon, { padding: [50, 50, 50, 50] });
  };

  useQuery({
    queryKey: ["getStateByIcao"],
    queryFn: async () => {
      const data = flightSingleData;
      // const data = await getStateByIcao(icao as string);

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
    icao,
    flightData,
    isSheetOpen,
    onSheetOpen,
    onSetIcao,
  };
};
