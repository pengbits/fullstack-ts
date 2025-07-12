import { useState, useCallback } from 'react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import type {MapCameraChangedEvent, MapCameraProps} from '@vis.gl/react-google-maps';

import useMapBounds from '../hooks/useMapBounds';
import useMapZoom from '../hooks/useMapZoom';
import useFetch from '../hooks/useFetch';

import { 
  getDimensionsFromBounds, 
  getSearchRadiusFromDimensions 
} from '../util/geo';

import type {Bounds} from '../types/geo/bounds'

import type {MarkerGroupLocation} from './MarkerGroup';
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
  
  const INITIAL_CAMERA = {
    center: {lat, lng:lon},
    zoom: defaultZoom
  }

  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  
  const onBoundsChanged = (bounds:Bounds) => {
    const dimens = getDimensionsFromBounds(bounds)
    const radius = getSearchRadiusFromDimensions(dimens)
    const center = map?.getCenter()

    if(!center) return
    // can we determine the num groups using the radius and the zoom?
    // can we be intentional about which api to call and which components 
    // should be used to render the data at this level?
    const groups = radius > 500 ?  Math.floor(radius / 15) : ''
    console.log({groups, radius})
    setUrl(`/api/meters/${center.lat()},${center.lng()}/${radius}/${groups}`)
  }

  const onZoomChanged = (zoom_:number) => {
    // console.log(`onZoomChanged: ${zoom_}`)
  }


  const handleGroupClick = ({lat,lon,count}:MarkerGroupLocation) => {
    console.log(`MapContainer#handleGroupClick ${lat},${lon} ${count}` )
    setCameraProps({
      ...cameraProps,
      center: {lat,lng:lon},
      zoom: Math.max(zoom + 1, 16)
    })
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
  

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail)
  }, [cameraProps]);

return (<>
    {isError && <div className='errors'>{error}</div>}
    <Map
      mapId={mapId}
      style={{width: '100vw', height: '100vh'}}
      {...cameraProps}
      onCameraChanged={handleCameraChange}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <MarkerCollection 
        data={data} 
        zoom={zoom}
        handleGroupClick={handleGroupClick}
        center={map?.getCenter()}
      />
    </Map>
    </>
  )
}
export default MapContainer