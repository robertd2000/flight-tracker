import { RefObject, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RMap } from "rlayers";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { toast } from "sonner";
import { getStateByIcao } from "@/api/flights/states.api";
import { FlightData, FlightStates } from "@/types/flights/states.interface";
import { transformData } from "../utils/data";
// import { flightSingleData } from "@/mocs/flights";

export const useSingleFlight = (mapRef: RefObject<RMap>) => {
  const [flightData, setflightData] = useState<FlightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [icaoInput, setIcaoInput] = useState<string>("");
  const [icao, setIcao] = useState<string | null>(null);
  const [isIcaoSetted, setIsIcaoSetted] = useState<boolean>(false);

  const onSheetOpen = useCallback((e: boolean) => {
    setIsSheetOpen(e);
    if (!e) setIcao(null);
  }, []);

  const onSetIcao = useCallback(({ icao24 }: { icao24: string }) => {
    setIcao(icao24);
    setIsIcaoSetted(true);
  }, []);

  const zoomToCoords = useCallback(
    ({ latitude, longitude }: { longitude: number; latitude: number }) => {
      const center = fromLonLat([longitude, latitude]);
      const polygon = new Polygon([[center]]);

      mapRef.current?.ol.getView().fit(polygon, { padding: [50, 50, 50, 50] });
    },
    [mapRef]
  );

  const { error, isLoading } = useQuery({
    queryKey: ["getStateByIcao"],
    queryFn: async () => {
      // const data = flightSingleData;
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

        const transformedFlightData = transformData({
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

        setflightData(transformedFlightData);

        if (isIcaoSetted) {
          zoomToCoords({
            longitude,
            latitude,
          });
        }

        setIsIcaoSetted(false);
      }

      return data;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
    enabled: !!icao,
  });

  useEffect(() => {
    if (icao) setIsIcaoSetted(false);
  }, [icao]);

  if (error) {
    toast("Произошла ошибка на сервере", {
      description: error.message,
    });
  }

  return {
    icao,
    flightData,
    isSheetOpen,
    icaoInput,
    isLoading,
    setIcaoInput,
    onSheetOpen,
    onSetIcao,
  };
};
