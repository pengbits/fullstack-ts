import type MeterAttributes from "@/types/api/MeterAttributes";
import { measure } from "../geo";
import type { Point } from "@/types/geo/point";

export const aggregate = (meters:Array<MeterAttributes>) => {
  console.log(`aggregate ${meters.length} meters into groups`)
  return []
}
const minium_distance_to_merge = 50
export const canMerge = (a:MeterAttributes, b:MeterAttributes) => {
  const diff = measure({
    lat:a.lat,
    lon:a.long
  }, {
    lat:b.lat,
    lon:b.long
  })
  console.log(diff)
  return diff < minium_distance_to_merge 
}