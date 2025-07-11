import { useState } from 'react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import useMapBounds from '../hooks/useMapBounds';
import useMapZoom from '../hooks/useMapZoom';
import useFetch from '../hooks/useFetch';

import { 
  getDimensionsFromBounds, 
  getSearchRadiusFromDimensions 
} from '../util/geo';

import type {Bounds} from '../types/geo/bounds'

import MarkerCollection from './MarkerCollection'

export interface MapContainerProps {
  lat: number,
  lon: number,
  defaultZoom:number,
  mapId?:string
}

const MapContainer = ({lat,lon,defaultZoom,mapId}:MapContainerProps) => {
  const map = useMap()
  const [url, setUrl] = useState('')

  const onBoundsChanged = (bounds:Bounds) => {
    const dimens = getDimensionsFromBounds(bounds)
    const radius = getSearchRadiusFromDimensions(dimens)
    const center = map?.getCenter()

    if(!center) return
    // can we determine the num groups using the radius and the zoom?
    // can we be intentional about which api to call and which components 
    // should be used to render the data at this level?
    setUrl(`/api/meters/${center.lat()},${center.lng()}/${radius}`)
  }
  
  const onZoomChanged = (zoom_:number) => {
    // console.log(`onZoomChanged: ${zoom_}`)
  }

  const {
    data,
    isError,
    error
  } = useFetch(url)

  useMapBounds({
    map,
    onChange:onBoundsChanged
  })
  
  const {zoom} = useMapZoom({
    map,
    defaultZoom,
    onChange:onZoomChanged
  })
  
  return (<>
    {isError && <div className='errors'>{error}</div>}
    <Map
      mapId={mapId}
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat,lng:lon}}
      defaultZoom={defaultZoom}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <MarkerCollection 
        data={data} 
        zoom={zoom}
        center={map?.getCenter()}
      />
    </Map>
    </>
  )
}
export default MapContainer