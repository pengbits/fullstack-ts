import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
import type MeterAttributes from '../types/api/MeterAttributes';

const Marker = ({meter_number,lat,long}:MeterAttributes) => (<AdvancedMarker
    key={meter_number}
    position={{lat,lng:long}}
    clickable={true}
  >
  <MarkerPin label={meter_number} showTail={true} />
</AdvancedMarker>)

export default Marker