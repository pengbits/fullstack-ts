import { MeterAttributes } from "./MeterAttributes"
export default interface ParkingSessionAttributes {
  start: string, // ISO
  end: string, // ISO
  active: Boolean,
  meter: MeterAttributes
}