import type { MeterAttributes } from "./MeterAttributes"
export default interface ParkingSessionAttributes {
  id?:string,
  started: string, // ISO-like but without timezone 'MM-DD-YYYY HH:mm:ss'
  ends?: string,
  duration?: number,
  active: Boolean,
  meter: MeterAttributes,
  cost: number
}