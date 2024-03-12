export interface FlightState {
  time: number;
  states: [
    string, // icao24
    // Unique ICAO 24-bit address of the transponder in hex string representation.
    string, // callsign - позывной
    // Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
    string, // origin_country
    // Country name inferred from the ICAO 24-bit address.
    number, // time_position
    // Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s.
    number, // last_contact
    // Unix timestamp (seconds) for the last update in general. This field is updated for any new, valid message received from the transponder.
    number, // longitude
    // WGS-84 longitude in decimal degrees. Can be null.
    number, // latitude
    // WGS-84 latitude in decimal degrees. Can be null.
    number, // baro_altitude
    // Barometric altitude in meters. Can be null.
    boolean, // on_ground
    // Boolean value which indicates if the position was retrieved from a surface position report.
    number, // velocity
    // Velocity over ground in m/s. Can be null.
    number, // true_track
    // True track in decimal degrees clockwise from north (north=0°). Can be null.
    number, // vertical_rate
    // Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null.
    number[], // sensors
    // IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request.
    number, // geo_altitude
    // Geometric altitude in meters. Can be null.
    string, // squawk
    // The transponder code aka Squawk. Can be null.
    boolean, // spi
    // Whether flight status indicates special purpose indicator.
    PositionSource, // position_source
    // Origin of this state’s position.
    // 0 = ADS-B
    // 1 = ASTERIX
    // 2 = MLAT
    // 3 = FLARM
    CategoryNumberType // category
    //     Aircraft category.
    // 0 = No information at all
    // 1 = No ADS-B Emitter Category Information
    // 2 = Light (< 15500 lbs)
    // 3 = Small (15500 to 75000 lbs)
    // 4 = Large (75000 to 300000 lbs)
    // 5 = High Vortex Large (aircraft such as B-757)
    // 6 = Heavy (> 300000 lbs)
    // 7 = High Performance (> 5g acceleration and 400 kts)
    // 8 = Rotorcraft
    // 9 = Glider / sailplane
    // 10 = Lighter-than-air
    // 11 = Parachutist / Skydiver
    // 12 = Ultralight / hang-glider / paraglider
    // 13 = Reserved
    // 14 = Unmanned Aerial Vehicle
    // 15 = Space / Trans-atmospheric vehicle
    // 16 = Surface Vehicle – Emergency Vehicle
    // 17 = Surface Vehicle – Service Vehicle
    // 18 = Point Obstacle (includes tethered balloons)
    // 19 = Cluster Obstacle
    // 20 = Line Obstacle
  ][];
}

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type CategoryNumberType = IntRange<0, 21>;
type PositionSource = IntRange<0, 5>;
