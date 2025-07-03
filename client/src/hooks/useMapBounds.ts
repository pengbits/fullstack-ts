import { useEffect } from "react";

interface useMapBoundsParams {
  map:any,
  onChange:Function
}

export default ({map,onChange}:useMapBoundsParams) => {
  const onBoundsChanged = () => {
    const bounds = map.getBounds();
    if (bounds) {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const center = map.getCenter()

      onChange({
        ne: { lat: ne.lat(), lon: ne.lng() },
        sw: { lat: sw.lat(), lon: sw.lng() },
        center
      })
    }
  }

  useEffect(() => {
    if(!map) return
    let listener = map.addListener('bounds_changed', onBoundsChanged)
    return () => {
      google.maps.event.removeListener(listener)
    }
  },
  [map])
}