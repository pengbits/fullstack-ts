import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
import type MeterAttributes from '../types/api/MeterAttributes';

const handleClick = (meter_number:string) => {
  window.location.href = `/sessions/new/${meter_number}` 
}

const Marker = ({meter_number,lat,long}:MeterAttributes) => (<AdvancedMarker
    key={meter_number}
    position={{lat,lng:long}}
    onClick={e => handleClick(meter_number)}
    data-meter-number={meter_number}
  >
  <MarkerPin label={meter_number} showTail={true} />
</AdvancedMarker>)

export default Marker