import { useState, useEffect } from 'react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import useMapBounds from '../hooks/useMapBounds';
import { 
  getDimensionsFromBounds, 
  getSearchRadiusFromDimensions 
} from '../util/geo';
import type {Bounds} from '../types/geo'
import type { Point } from '../types/geo/point';


export interface MapContainerProps {
  lat: number,
  lon: number,
  zoom?:number
}

const MapContainer = ({lat,lon,zoom}:MapContainerProps) => {
  const map = useMap()

  const onChange = (bounds:Bounds) => {
    const dimens = getDimensionsFromBounds(bounds)
    const radius = getSearchRadiusFromDimensions(dimens)
    const center = map?.getCenter()

    if(!center) return
    const url = `/api/meters/${center.lat()},${center.lng()}/${radius}`
    console.log(url)

  }

  useMapBounds({map,onChange})

  return (
    <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat,lng:lon}}
        defaultZoom={zoom || 15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
  )
}
export default MapContainer