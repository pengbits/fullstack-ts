import { MeterAttributes } from "./MeterAttributes"

export interface MetersResponse {
  error? : unknown,
  meters: MeterAttributes[]
}