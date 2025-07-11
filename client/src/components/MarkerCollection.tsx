import Marker from "./Marker"
import MarkerGroup from '@/components/MarkerGroup'
import type { MetersResponse } from "../types/api/MetersResponse"
import type { MeterAttributes } from '../types/api/MeterAttributes';
import type { MeterGroupsResponse } from "@/types/api/MeterGroupsResponse";
import type { MeterGroupAttributes } from "@/types/api/MeterGroupAttributes";

interface MarkerCollectionProps {
  data:MetersResponse | MeterGroupsResponse
  zoom:number,
  center?:any
}

const isGroups = (data:MetersResponse | MeterGroupsResponse): data is MeterGroupsResponse =>
  typeof data === 'object' && data !== null &&
  Object.prototype.hasOwnProperty.call(data, 'meter_groups')

const MarkerCollection = ({data,zoom,center}:MarkerCollectionProps) => {
  if(!data) return null

  if(isGroups(data)){
    return renderMarkerGroups(data.meter_groups || [])
  } else {
    return renderMarkers((data.meters || []))
  }
}

const renderMarkerGroups = (meter_groups:Array<MeterGroupAttributes>) => (meter_groups.map((attrs) => {
  return <MarkerGroup
    key={`${attrs.lat},${attrs.lon}`}
    lat={attrs.lat}
    lon={attrs.lon}
    count={attrs.count}
  ></MarkerGroup> 
}))

const renderMarkers = (meters:Array<MeterAttributes>) => (meters.map((attrs) => {
  return <Marker key={attrs.meter_number} {...attrs} />
}))

export default MarkerCollection