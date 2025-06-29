export interface Point {
  lat:number,
  lon:number
}
//https://www.movable-type.co.uk/scripts/latlong.html
//haversine
const getDistanceBetweenPoints = function(lat1:number, lon1:number, lat2:number, lon2:number){
  const R = 6371e3; // metres
  const φ1:number = lat1 * Math.PI/180; // φ, λ in radians
  const φ2:number = lat2 * Math.PI/180;
  const Δφ:number = (lat2-lat1) * Math.PI/180;
  const Δλ:number = (lon2-lon1) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres
  return d
}

export const isInsideCircle = (point1:Point, circleCenter:Point, circleRadius:number) => {
  // console.log(`  point1 ${point1.lat},${point1.lon}
  // circleCenter ${circleCenter.lat},${circleCenter.lon}
  // circleRadius ${circleRadius}
  // distance: ${getDistanceBetweenPoints(point1.lat,point1.lon,circleCenter.lat,circleCenter.lon)}`
  // )
  // console.log('circleRadius', circleRadius)
  const distance = getDistanceBetweenPoints(point1.lat,point1.lon,circleCenter.lat,circleCenter.lon)
  return distance <= circleRadius
}