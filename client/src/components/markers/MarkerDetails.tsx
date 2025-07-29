import './MarkerDetails.css'
import { Link } from 'react-router'
import type {MeterAttributes}  from '@/common/types/api/MeterAttributes'

interface MarkerDetailsProps {
  onClose: Function,
  meter: MeterAttributes
}
const MarkerDetails = ({onClose,meter}:MarkerDetailsProps) => {
  return (
    <div className="marker-details">
      <h5 className="marker-details__meter-number">{meter.meter_number}</h5>
      <h4 className="marker-details_street">{meter.side_of_street} {meter.on_street}</h4>
      <p>From {meter.from_street} to {meter.to_street}</p>
      <Link to={`/sessions/new/${meter.meter_number}`}>
        Park Here
      </Link>
      <div className="marker-details__closer"
        onClick={e => onClose()}
      >x</div>
    </div>
  )
}
export default MarkerDetails