import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"

const SessionDetails = ({
  meter,
  started,
  ends,
}:ParkingSessionAttributes) => {
  return (<div>
    <h4>{meter.meter_number} {meter.side_of_street} {meter.on_street}</h4>
    <p>
      <b>Started:</b><br />
      {started}
    </p>
    <p>
      <b>Ends:</b><br />
      {ends}
    </p>
    <p>Remaining Time: </p>
    <p><b>Cost:</b><br />
      $0.00
    </p>
  </div>)
}
export default SessionDetails