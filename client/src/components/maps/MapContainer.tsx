import throttle from 'lodash.throttle'
import { useState, useEffect, useMemo } from 'react';
import {Map } from '@vis.gl/react-google-maps';
import type { MapCameraProps} from '@vis.gl/react-google-maps';

import useMapCamera from '@/hooks/useMapCamera';
import useFetch from '@/hooks/useFetch';


import type {Bounds} from '@/types/geo/bounds'
import type {MeterAttributes} from '@/common/types/api/MeterAttributes'
import { getDimensionsFromBounds, getSearchRadiusFromDimensions } from '@/util/geo';


import type {MarkerGroupLocation} from '@/components/markers/MarkerGroup';
import MarkerCollection from '@/components/markers/MarkerCollection'
import MarkerDetails from '@/components/markers/MarkerDetails'
import SearchBox from '@/components/maps/SearchBox'

import './MapContainer.css'

export interface MapContainerProps {
  lat: number,
  lon: number,
  defaultZoom:number,
  mapId?:string
}

const MapContainer = ({lat,lon,defaultZoom,mapId}:MapContainerProps) => {
  const [url, setUrl] = useState('')
  const [activeMeter,setActiveMeter] = useState<null | MeterAttributes>(null)

  const setUrlThrottled = useMemo(
    () => throttle((url: string) => {
      setUrl(url)
    }, 500),
    []
  )

  useEffect(() => {
    return () => setUrlThrottled.cancel()
  }, [setUrlThrottled])

  const {
    cameraProps,
    setCameraProps,
    animateCamera,
    onCameraChanged
  } = useMapCamera({
    cameraProps: {
      center: {lat, lng:lon},
      zoom: defaultZoom
    },
    handleCameraChanged: (cameraProps:MapCameraProps, bounds:Bounds) => {
      const dimens = getDimensionsFromBounds(bounds)
      const radius = getSearchRadiusFromDimensions(dimens)
      const {center} = cameraProps
      if(!center) return

      const groups = radius > 500 ?  Math.floor(radius / 15) : ''
      setUrlThrottled(`/api/meters/${center.lat},${center.lng}/${radius}/${groups}`)  
    }
  })


  const handleGroupClick = ({lat,lon}:MarkerGroupLocation) => {
    // console.log(`MapContainer#handleGroupClick ${lat},${lon} ${count}` )
    animateCamera({
      lat, 
      lng:lon,
      zoom: Math.min(cameraProps.zoom +1, 18)
    })
  }

  const {
    data,
    isError,
    error
  } = useFetch(url)


  const handleSelectMeter = (meter:MeterAttributes) => {
    setActiveMeter(meter)
    animateCamera({
      lat:meter.lat, 
      lng:meter.long,
      zoom: Math.min(cameraProps.zoom +2, 18) // not sure this is working
    })
  }


  return (<div className="map-container">
    {isError && <div className='errors'>{error}</div>}
    <Map
      className="map"
      mapId={mapId}
      {...cameraProps}
      onCameraChanged={onCameraChanged}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <MarkerCollection 
        data={data} 
        zoom={cameraProps.zoom}
        handleGroupClick={handleGroupClick}
        handleClick={handleSelectMeter}
        activeMeter={activeMeter}
      />
    </Map>
    {!!activeMeter && <MarkerDetails
      meter={activeMeter}
      onClose={e => setActiveMeter(null)} />}
    {!activeMeter && <SearchBox 
      onSelectMeter={handleSelectMeter}
    />}
    </div>
    
  )
}
export default MapContainer