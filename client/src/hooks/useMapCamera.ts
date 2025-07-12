import type {MapCameraChangedEvent, MapCameraProps} from '@vis.gl/react-google-maps';
import type { Bounds } from '@/types/geo/bounds';
import { useState } from "react"

interface useMapEventsParams {
  cameraProps: MapCameraProps
  handleCameraChanged: Function 
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
  
  return {
    cameraProps,
    setCameraProps,
    onCameraChanged
  }
}

export default useMapCamera