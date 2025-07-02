import type {Point} from "../types/geo/point"

export const measure = (p1:Point, p2:Point) => {
  const R = 6371e3; // metres
  const φ1 = p1.lat * Math.PI/180; // φ, λ in radians
  const φ2 = p2.lat * Math.PI/180;
  const Δφ = (p2.lat-p1.lat) * Math.PI/180;
  const Δλ = (p2.lon-p1.lon) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres
  return d
}

import type { Bounds } from "../types/geo/bounds";
export const getDimensionsFromBounds = ({ne,sw}:Bounds) => {
  const width = Math.floor(measure({lat:ne.lat, lon:ne.lon},{lat:ne.lat, lon:sw.lon}))
  const height  = Math.floor(measure({lat:sw.lat, lon:ne.lon},{lat:ne.lat, lon:ne.lon}))
  return {
    width,height
  }
}

export const getSearchRadiusFromDimensions = ({width,height}:any) => {
  const largest= Math.max(width, height)
  return Math.floor(largest / 2)
}