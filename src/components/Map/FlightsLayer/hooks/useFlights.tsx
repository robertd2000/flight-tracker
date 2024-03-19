import { useState } from "react";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
// import { getStates } from "@/api/flights/states.api";
import { useMapCoords } from "@/hooks/map/useMapCoords";
import { FlightStates } from "@/types/flights/states.interface";
import { flightData } from "@/mocs/flights";

export const useFlights = () => {
  const [flightFeatures, setflightFeatures] = useState<(Feature | null)[]>([]);

  const { getCoords } = useMapCoords();

  const { lamax, lamin, lomax, lomin, lat, lon } = getCoords();

  const { error } = useQuery({
    queryKey: ["getStates", { lat, lon }],
    queryFn: async () => {
      // const data = await getStates({
      //   lamax,
      //   lamin,
      //   lomax,
      //   lomin,
      // });

      const data = flightData;

      if (data && data?.states?.length) {
        setflightFeatures(
          data?.states.map((i, idx) => {
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
            ] = i as FlightStates;

            if (
              longitude >= lomin &&
              longitude <= lomax &&
              latitude >= lamin &&
              latitude <= lamax
            ) {
              const point = new Point(fromLonLat([longitude, latitude]));
              return new Feature({
                data: {
                  rotation: true_track,
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
                  vertical_rate,
                  sensors,
                  geo_altitude,
                  squawk,
                  spi,
                  // position_source,
                  category,
                },
                geometry: point,
                name: callsign,
                styleId: idx % (data.states.length - 1),
              });
            }
            return null;
          })
        );
      }

      return data;
    },
    refetchInterval: 1500,
    refetchOnWindowFocus: false,
  });

  if (error) {
    toast("Произошла ошибка на сервере", {
      description: error.message,
    });
  }

  return {
    flightFeatures,
  };
};
