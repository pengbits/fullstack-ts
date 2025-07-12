import Marker from "./Marker"
import MarkerGroup from '@/components/MarkerGroup'
import type { MetersResponse } from "../types/api/MetersResponse"
import type { MeterAttributes } from '../types/api/MeterAttributes';
import type { MeterGroupsResponse } from "@/types/api/MeterGroupsResponse";
import type { MeterGroupAttributes } from "@/types/api/MeterGroupAttributes";

interface MarkerCollectionProps {
  data:MetersResponse | MeterGroupsResponse
  zoom:number,
  handleGroupClick:Function
}

const isGrouped = (data:MetersResponse | MeterGroupsResponse): data is MeterGroupsResponse =>
  typeof data === 'object' && data !== null &&
  Object.prototype.hasOwnProperty.call(data, 'meter_groups')

const MarkerCollection = ({data,handleGroupClick}:MarkerCollectionProps) => {
  if(!data) return null

  if(isGrouped(data)){
    return renderMarkerGroups((data.meter_groups || []), handleGroupClick)
  } else {
    return renderMarkers((data.meters || []))
  }
}

const renderMarkerGroups = (meter_groups:Array<MeterGroupAttributes>, handleGroupClick:Function) => (meter_groups.map(({lat,lon,count}) => {
  // TODO return a marker if the group count is 1
  return <MarkerGroup
    key={`${lat},${lon}`}
    lat={lat}
    lon={lon}
    count={count}
    handleGroupClick={handleGroupClick}
  ></MarkerGroup> 
}))

const renderMarkers = (meters:Array<MeterAttributes>) => (meters.map((attrs) => {
  return <Marker key={attrs.meter_number} {...attrs} />
}))

export default MarkerCollection