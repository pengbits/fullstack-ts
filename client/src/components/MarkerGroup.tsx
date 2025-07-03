import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
export interface MarkerGroupAttributes {
  lat:number,
  lon:number,
  count:number
}
const MarkerGroup = ({lat,lon,count}:MarkerGroupAttributes) => (<AdvancedMarker
    key={`${lat}-${lon}`}
    position={{lat,lng:lon}}
    clickable={true}
  >
  <MarkerPin label={`${count}`} />
</AdvancedMarker>)

export default MarkerGroup