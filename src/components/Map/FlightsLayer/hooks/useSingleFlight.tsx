import { RefObject, useState } from "react";
import { FlightData, FlightStates } from "@/types/flights/states.interface";
import { useQuery } from "@tanstack/react-query";
import { RMap } from "rlayers";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { getStateByIcao } from "@/api/flights/states.api";
import { flightSingleData } from "@/mocs/flights";
import { formatDateFromNow } from "@/utils/date";

export const useSingleFlight = (mapRef: RefObject<RMap>) => {
  const [flightData, setflightData] = useState<FlightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [icaoInput, setIcaoInput] = useState<string>("");
  const [icao, setIcao] = useState<string | null>(null);
  const [isIcaoSetted, setIsIcaoSetted] = useState<boolean>(false);

  const onSheetOpen = (e: boolean) => {
    setIsSheetOpen(e);
    if (!e) setIcao(null);
  };

  const onSetIcao = ({ icao24 }: { icao24: string }) => {
    setIcao(icao24);
    setIsIcaoSetted(true);
  };

  const zoomToCoords = ({
    latitude,
    longitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    const center = fromLonLat([longitude, latitude]);
    const polygon = new Polygon([[center]]);

    mapRef.current?.ol.getView().fit(polygon, { padding: [50, 50, 50, 50] });
  };

  useQuery({
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

        const lastContact = formatDateFromNow(last_contact);

        setflightData({
          icao24,
          callsign,
          origin_country,
          time_position,
          last_contact: lastContact,
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

        if (isIcaoSetted)
          zoomToCoords({
            longitude,
            latitude,
          });

        setIsIcaoSetted(false);
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
    icaoInput,
    setIcaoInput,
    onSheetOpen,
    onSetIcao,
  };
};
