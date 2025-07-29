import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
import type {MeterAttributes} from '@/common/types/api/MeterAttributes';
import './marker.css'

interface MarkerProps extends MeterAttributes  {
  handleClick: Function,
  active:Boolean
}

const Marker = (m:MarkerProps) => (<AdvancedMarker
    key={m.meter_number}
    position={{lat:m.lat,lng:m.long}}
    onClick={e => m.handleClick(m)}
    className={`marker ${m.active ? 'active':''}`}
  >
  <MarkerPin label={m.meter_number} showTail={true} />
</AdvancedMarker>)

export default Marker