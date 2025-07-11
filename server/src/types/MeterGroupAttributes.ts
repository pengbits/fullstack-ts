import MeterAttributes from "./MeterAttributes"
export interface MeterGroupAttributes {
  centroid: {
    lat: number,
    long: number
  },
  count: number,
  meters: Array<MeterAttributes>
}
export default MeterGroupAttributes