import Marker from "./Marker"
import MarkerGroup from '@/components/MarkerGroup'
import type { MetersResponse } from "../types/api/MetersResponse"
import type { MeterAttributes } from '../types/api/MeterAttributes';

interface MarkerCollectionProps {
  data:MetersResponse,
  zoom:number,
  center?:any
}

const min_zoom_to_render_distinct_markers = 16
const MarkerCollection = ({data,zoom,center}:MarkerCollectionProps) => {
  if(!data || !data.meters || !data.meters.length){
    return null
  }

  if(zoom > min_zoom_to_render_distinct_markers){
    return renderAllMarkers(data.meters)
  } else {

    return <MarkerGroup
      lat={center.lat()}
      lon={center.lng()}
      count={data.meters.length}
    ></MarkerGroup>
  }
}

const renderAllMarkers = (meters:Array<MeterAttributes>) => (meters.map((attrs) => {
  return <Marker key={attrs.meter_number} {...attrs} />
}))

export default MarkerCollection