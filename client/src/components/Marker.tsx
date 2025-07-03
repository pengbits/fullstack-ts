import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
import type MeterAttributes from '../types/api/MeterAttributes';

const handleClick = (e) => {
  const {srcElement} = e.domEvent
  // TODO use a ref or mark this up as a data-attribute (wasn't working)
  // const [markerRef, marker] = useAdvancedMarkerRef();
  const meter_number = `${srcElement.innerHTML}`
  window.location.href = `/sessions/new/${meter_number}` 
}

const Marker = ({meter_number,lat,long}:MeterAttributes) => (<AdvancedMarker
    key={meter_number}
    position={{lat,lng:long}}
    onClick={handleClick}
    data-meter-number={meter_number}
  >
  <MarkerPin label={meter_number} showTail={true} />
</AdvancedMarker>)

export default Marker