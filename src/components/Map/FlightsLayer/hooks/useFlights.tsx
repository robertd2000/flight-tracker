import { useEffect, useState } from "react";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useQuery } from "@tanstack/react-query";
import { useMapCoords } from "@/hooks/map/useMapCoords";
import { FlightStates } from "@/types/flights/states.interface";
import { getStates } from "@/api/flights/states.api";

export const useFlights = () => {
  const [moduleFeatures, setModuleFeatures] = useState<Feature[]>([]);

  const { getCoords } = useMapCoords();

  const { lamax, lamin, lomax, lomin } = getCoords();

  useEffect(() => {
    refetch();
  }, [lamax, lamin, lomax, lomin]);

  const { refetch } = useQuery({
    queryKey: ["getStates"],
    queryFn: async () => {
      console.log("lamax, lamin, lomax, lomin", lamax, lamin, lomax, lomin);

      const data = await getStates({
        lamax,
        lamin,
        lomax,
        lomin,
      });

      // const data = {
      //   states: [
      //     [
      //       "4b1805",
      //       "SWR2DV  ",
      //       "Switzerland",
      //       1710321569,
      //       1710321569,
      //       5.3823,
      //       52.1946,
      //       4678.68,
      //       false,
      //       186.64,
      //       128.73,
      //       10.73,
      //       null,
      //       4739.64,
      //       "1000",
      //       false,
      //       0,
      //     ],
      //     [
      //       "39d228",
      //       "FHURI   ",
      //       "France",
      //       1710321568,
      //       1710321569,
      //       7.4022,
      //       43.2258,
      //       2133.6,
      //       false,
      //       86.34,
      //       131.86,
      //       0,
      //       null,
      //       2232.66,
      //       null,
      //       false,
      //       4,
      //     ],
      //     [
      //       "4b1800",
      //       "SWR3KH  ",
      //       "Switzerland",
      //       1710321569,
      //       1710321569,
      //       13.0529,
      //       50.068,
      //       6393.18,
      //       false,
      //       197.03,
      //       269.85,
      //       10.08,
      //       null,
      //       6438.9,
      //       "1000",
      //       false,
      //       2,
      //     ],
      //   ],
      // };
      if (data && data?.states?.length) {
        setModuleFeatures(
          data?.states.map((i) => {
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
              name: i?.[1],
            });
          })
        );
      }

      return data;
    },
    refetchInterval: 1500,
    refetchOnWindowFocus: false,
  });

  return {
    moduleFeatures,
  };
};
