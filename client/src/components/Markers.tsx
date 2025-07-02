import Marker from "./Marker"

const Markers = ({data}) => {
  if(data && data.meters && data.meters.length) {
    return data.meters.map((attrs) => {
      return <Marker key={attrs.meter_number} {...attrs} />
    })
  }
  
  return null
}

export default Markers