
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
export interface MarkerGroupLocation {
  lat:number,
  lon:number,
  count:number
}
export interface MarkerGroupAttributes extends MarkerGroupLocation{
  handleGroupClick:Function
}

const MarkerGroup = ({lat,lon,count,handleGroupClick}:MarkerGroupAttributes) => (<AdvancedMarker
    position={{lat,lng:lon}}
    clickable={true}
    onClick={(e:any) => handleGroupClick({lat,lon,count})}
  >
  <MarkerPin label={`${count}`} 
    data-location={`${lat},${lon}`}
  />
</AdvancedMarker>)

export default MarkerGroup