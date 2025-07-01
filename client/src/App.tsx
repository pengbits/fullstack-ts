import './App.css'

// import { useEffect } from 'react'
// import ParkingMap from './components/ParkingMap'
import {APIProvider, Map} from '@vis.gl/react-google-maps';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY

function App() {
  return (
    <APIProvider apiKey={API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 40.645344, lng:-73.9617345}}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  )
}

export default App
