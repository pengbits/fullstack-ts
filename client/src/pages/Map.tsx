import {APIProvider} from '@vis.gl/react-google-maps';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY
import MapContainer from "@/components/maps/MapContainer"

// just a hardcoded example, the real implementation  
// will pass lat,lon and maybe zoom from route params! 
export default () => {
  return (
    <APIProvider apiKey={API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <MapContainer 
        lat={40.6488136}
        lon={-73.9602228}
        defaultZoom={15}
        mapId={process.env.GOOGLE_MAPS_MAP_ID}
      />
    </APIProvider>
  )
}