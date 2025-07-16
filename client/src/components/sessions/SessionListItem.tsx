import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"
import { pretty } from "@/util/date"
import { prettyPrice } from "@/util/string"
interface SessionListItemProps extends ParkingSessionAttributes {
}

const SessionListItem = ({
  meter,
  started,
  cost
}:SessionListItemProps) => (
  <div className="session">
    <div className="body">
      <h4>{pretty(started, 'MMM DD, YYYY')}</h4>
      <p className="car">JNT-1095 - my honda</p>
      <p className="meter">{meter?.side_of_street} {meter?.on_street}</p>
    </div>
    <div className="footer">
      <p className="cost">{prettyPrice(cost)}</p>
    </div>
  </div>
)

export default SessionListItem