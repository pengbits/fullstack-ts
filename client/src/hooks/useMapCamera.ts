import type {MapCameraChangedEvent, MapCameraProps} from '@vis.gl/react-google-maps';
import type { Bounds } from '@/types/geo/bounds';
import { useState } from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

interface useMapEventsParams {
  cameraProps: MapCameraProps
  handleCameraChanged: Function 
}

interface CameraUpdateProps {
  lat:number,
  lng:number,
  zoom:number
}

const convertToBounds = (e: MapCameraChangedEvent):Bounds=> {
  const {bounds} = e.detail
  return {
    ne  : {lat:bounds.north, lon:bounds.east},
    sw  :  {lat:bounds.south, lon:bounds.west}
  }
}

const useMapCamera = (props:useMapEventsParams) => {
  const [cameraProps, setCameraProps] = useState(props.cameraProps)
  
  // TODO useCallback here?
  const onCameraChanged = (e: MapCameraChangedEvent) => {
    const bounds = convertToBounds(e)
    setCameraProps(e.detail)
    props.handleCameraChanged(cameraProps, bounds)
  }


  const animateCamera = (props:CameraUpdateProps) => {
    const {zoom,center} = cameraProps
    let update:CameraUpdateProps = {
      lat:center.lat,
      lng:center.lng,
      zoom
    }
    gsap.to(update, {
      ...props,
      duration: 0.5,
      onUpdate: () => (setCameraProps({
        center: {lat:update.lat, lng:update.lng},
        zoom: update.zoom
      }))
    })
  }
  
  return {
    cameraProps,
    setCameraProps,
    animateCamera,
    onCameraChanged
  }
}

export default useMapCamera