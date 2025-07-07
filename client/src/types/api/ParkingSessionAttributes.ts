import type { MeterAttributes } from "./MeterAttributes"
export default interface ParkingSessionAttributes {
  id?:string,
  started: string, // ISO-like but without timezone 'MM-DD-YYYY HH:mm:ss'
  ends?: string,
  active: Boolean,
  meter: MeterAttributes
}