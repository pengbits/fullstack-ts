import {useEffect } from 'react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import {
  getDimensionsFromBounds,
  getSearchRadiusFromDimensions
} from '../util/geo'

export interface MapContainerProps {
  lat: number,
  lon: number,
  zoom?:number
}

const MapContainer = ({lat,lon,zoom}:MapContainerProps) => {
  const map = useMap()
  
  useEffect(() => {
    if(!map) return
    map.addListener('bounds_changed', () => {
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const center = map.getCenter()
        console.log('Viewable Area:', {
          ne: { lat: ne.lat(), lng: ne.lng() },
          sw: { lat: sw.lat(), lng: sw.lng() }
        })
        const center_ = {lat: center?.lat(), lon:center?.lng()}
        const dimens = getDimensionsFromBounds({
          ne: { lat: ne.lat(), lon: ne.lng() },
          sw: { lat: sw.lat(), lon: sw.lng() }
        })
        console.log(dimens, 'center:',center_)
        console.log('radius:', getSearchRadiusFromDimensions(dimens))
      }
    });
  },[map])

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