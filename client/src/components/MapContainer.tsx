import {Map} from '@vis.gl/react-google-maps';

interface MapContainerProps {
  lat: number,
  lon: number
}

const MapContainer = ({lat,lon}:MapContainerProps) => {
  return (
    <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat,lng:lon}}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
  )
}
export default MapContainer