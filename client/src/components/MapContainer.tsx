import { useState, useEffect } from 'react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import useMapBounds from '../hooks/useMapBounds';
import useFetch from '../hooks/useFetch';

import { 
  getDimensionsFromBounds, 
  getSearchRadiusFromDimensions 
} from '../util/geo';
import type {Bounds} from '../types/geo'


export interface MapContainerProps {
  lat: number,
  lon: number,
  zoom?:number
}

const MapContainer = ({lat,lon,zoom}:MapContainerProps) => {
  const map = useMap()
  const [url, setUrl] = useState('')

  const onChange = (bounds:Bounds) => {
    const dimens = getDimensionsFromBounds(bounds)
    const radius = getSearchRadiusFromDimensions(dimens)
    const center = map?.getCenter()

    if(!center) return
    setUrl(`/api/meters/${center.lat()},${center.lng()}/${radius}`)
    console.log(url)

  }

  const {
    data,
    isError,
    isSuccess,
    error
  } = useFetch(url)

  useMapBounds({map,onChange})
  if(isSuccess) console.log(`found ${data.meters.length} meters!`)
  return (<>
    {isError && <div className='errors'>{error}</div>}
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat,lng:lon}}
      defaultZoom={zoom || 15}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
    </>
  )
}
export default MapContainer