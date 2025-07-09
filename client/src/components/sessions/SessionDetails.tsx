import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"
import { Link } from "react-router"
import { prettyPrice } from "@/util/string"
import CountDownWidget from "./CountDownWidget"
const SessionDetails = ({
  meter,
  started,
  ends,
  cost
}:ParkingSessionAttributes) => {
  return (<div style={{padding:'15px'}}>
    <h4>{meter.meter_number} {meter.side_of_street} {meter.on_street}</h4>
    <p>
      <b>Started:</b><br />
      {started}
    </p>
    <p>
      <b>Ends:</b><br />
      {ends}
    </p>
    <CountDownWidget 
      ends={ends}
    />
    <p><b>Cost:</b><br />
      {prettyPrice(cost)}
    </p>
    <p>
      <Link to={'/sessions/extend'}>Extend</Link>
    </p>
  </div>)
}
export default SessionDetails