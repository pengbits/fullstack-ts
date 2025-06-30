import { MeterAttributes } from "./MeterAttributes"
export default interface ParkingSessionAttributes {
  start: Date,
  end: Date,
  meter: MeterAttributes
}