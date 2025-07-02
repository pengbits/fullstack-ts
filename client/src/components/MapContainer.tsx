import { useState } from 'react';
import {
  Map, 
  useMap
} from '@vis.gl/react-google-maps';
import useMapBounds from '../hooks/useMapBounds';
import useFetch from '../hooks/useFetch';

import { 
  getDimensionsFromBounds, 
  getSearchRadiusFromDimensions 
} from '../util/geo';
import type {Bounds} from '../types/geo'

import Markers from './Markers';

export interface MapContainerProps {
  lat: number,
  lon: number,
  zoom?:number,
  mapId?:string
}

const MapContainer = ({lat,lon,zoom,mapId}:MapContainerProps) => {
  const map = useMap()
  const [url, setUrl] = useState('')

  const onChange = (bounds:Bounds) => {
    const dimens = getDimensionsFromBounds(bounds)
    const radius = getSearchRadiusFromDimensions(dimens)
    const center = map?.getCenter()

    if(!center) return
    setUrl(`/api/meters/${center.lat()},${center.lng()}/${radius}`)
  }

  const {
    data,
    isError,
    error
  } = useFetch(url)

  useMapBounds({map,onChange})
  
  return (<>
    {isError && <div className='errors'>{error}</div>}
    <Map
      mapId={mapId}
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat,lng:lon}}
      defaultZoom={zoom || 15}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <Markers data={data} />
    </Map>
    </>
  )
}
export default MapContainer