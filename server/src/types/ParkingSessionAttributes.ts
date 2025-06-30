import { MeterAttributes } from "./MeterAttributes"
export default interface ParkingSessionAttributes {
  start: string, // ISO-like but without timezone 'MM-DD-YYYY HH:mm:ss'
  end: string,
  active: Boolean,
  meter: MeterAttributes
}