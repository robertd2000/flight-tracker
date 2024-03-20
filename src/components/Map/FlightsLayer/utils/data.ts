import { PositionCategories } from "@/constants/flights/categories";
import { FlightDataSource } from "@/types/flights/states.interface";
import { formatDateFromNow } from "@/utils/date";

const knotsToKmH = (velocity: number) => {
  return (velocity / 0.539957)?.toFixed(2);
};

const feetToMeters = (value: number) => {
  return `${value}ft (${(value * 0.3048)?.toFixed(2)}m)`;
};

const feetPMToMetersPS = (value: number) => {
  return `${value}ft/min (${(value * 0.00508)?.toFixed(2)}m/s)`;
};

export const transformData = (data: FlightDataSource) => {
  const {
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
  } = data;

  return {
    icao24,
    callsign,
    origin_country,
    time_position,
    last_contact: formatDateFromNow(last_contact as number),
    longitude,
    latitude,
    baro_altitude: feetToMeters(baro_altitude),
    on_ground,
    velocity: `${velocity} kn (${knotsToKmH(velocity)})`,
    true_track: `${true_track}°`,
    vertical_rate: feetPMToMetersPS(vertical_rate),
    sensors,
    geo_altitude: feetToMeters(geo_altitude),
    squawk,
    spi,
    // position_source,
    category: PositionCategories[category],
  };
};
