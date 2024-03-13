export enum AircraftCategories {
  "no_category", // 0 = No information at all
  "noADSB", // 1 = No ADS-B Emitter Category Information
  "light", // 2 = Light (< 15500 lbs)
  "small", // 3 = Small (15500 to 75000 lbs)
  "large", // 4 = Large (75000 to 300000 lbs)
  "HVL", // 5 = High Vortex Large (aircraft such as B-757)
  "heavy", // 6 = Heavy (> 300000 lbs)
  "hight_performance", // 7 = High Performance (> 5g acceleration and 400 kts)
  "rotorcraft", // 8 = Rotorcraft
  "glider", // 9 = Glider / sailplane
  "lighter_than_air", // 10 = Lighter-than-air
  "parachutist", // 11 = Parachutist / Skydiver
  "ultralight", // 12 = Ultralight / hang-glider / paraglider
  "reserved", // 13 = Reserved
  "UAV", // 14 = Unmanned Aerial Vehicle
  "space", // 15 = Space / Trans-atmospheric vehicle
  "emergency_vehicle", // 16 = Surface Vehicle – Emergency Vehicle
  "service_vehicle", // 17 = Surface Vehicle – Service Vehicle
  "point-obstacle", // 18 = Point Obstacle (includes tethered balloons)
  "cluster_obstacle", // 19 = Cluster Obstacle
  "line_obstacle", // 20 = Line Obstacle
}
