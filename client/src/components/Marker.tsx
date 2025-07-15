import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
import type MeterAttributes from '../types/api/MeterAttributes';


interface MarkerProps extends MeterAttributes  {
  handleClick: Function
}

const Marker = (m:MarkerProps) => (<AdvancedMarker
    key={m.meter_number}
    position={{lat:m.lat,lng:m.long}}
    onClick={e => m.handleClick(m)}
  >
  <MarkerPin label={m.meter_number} showTail={true} />
</AdvancedMarker>)

export default Marker