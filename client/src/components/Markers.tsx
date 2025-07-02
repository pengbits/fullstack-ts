import Marker from "./Marker"
import type { MetersResponse } from "../types/api/MetersResponse"

interface MarkersProps {
  data:MetersResponse
}
const Markers = ({data}:MarkersProps) => {
  if(data && data.meters && data.meters.length) {
    return data.meters.map((attrs) => {
      return <Marker key={attrs.meter_number} {...attrs} />
    })
  }
  
  return null
}

export default Markers