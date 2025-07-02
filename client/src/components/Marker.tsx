import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';

export interface MarkerProps {
  meter_number:string,
  lat:number,
  long:number
}

const Marker = ({meter_number,lat,long}:MarkerProps) => (<AdvancedMarker
    key={meter_number}
    position={{lat,lng:long}}
    clickable={true}
  >
  <MarkerPin meter_number={meter_number} />
</AdvancedMarker>)

export default Marker