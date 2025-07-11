import {AdvancedMarker} from '@vis.gl/react-google-maps';
import MarkerPin from './MarkerPin';
export interface MarkerGroupAttributes {
  lat:number,
  lon:number,
  count:number
}
const handleClick = (data:MarkerGroupAttributes) => {
  console.log('MarkerGroup#handleClick()', data)
}


const MarkerGroup = ({lat,lon,count}:MarkerGroupAttributes) => (<AdvancedMarker
    position={{lat,lng:lon}}
    clickable={true}
    onClick={e => handleClick({lat,lon,count})}
  >
  <MarkerPin label={`${count}`} 
    data-location={`${lat},${lon}`}
  />
</AdvancedMarker>)

export default MarkerGroup