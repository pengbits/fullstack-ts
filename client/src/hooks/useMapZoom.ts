import { useState, useEffect } from "react";

interface useMapZoomParams {
  map:any,
  onChange:Function,
  defaultZoom:number
}

export default ({map,onChange,defaultZoom}:useMapZoomParams) => {
  const [zoom,setZoom] = useState(defaultZoom)
  const onZoomChanged = () => {
    onChange( map.getZoom())
    setZoom(map.getZoom())
  }

  useEffect(() => {
    if(!map) return
    let listener = map.addListener('zoom_changed', onZoomChanged)
    return () => {
      google.maps.event.removeListener(listener)
    }
  },
  [map])

  return {
    zoom
  }
}