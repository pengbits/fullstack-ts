import type {MeterGroupAttributes} from "./MeterGroupAttributes"

export interface MeterGroupsResponse {
  error? : unknown,
  meter_groups: Array<MeterGroupAttributes>
}