import './App.css'

// import { useEffect } from 'react'

import {APIProvider} from '@vis.gl/react-google-maps';
import MapPage from './pages/Map';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY

function App() {
  return (
    <APIProvider apiKey={API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <MapPage 
        lat={40.6488136}
        lon={-73.9602228}
        zoom={17}
      />
    </APIProvider>
  )
}

export default App
