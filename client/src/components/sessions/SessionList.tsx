import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"
import SessionListItem from "./SessionListItem"

interface SessionListProps {
  sessions : Array<ParkingSessionAttributes>
}
const SessionList = ({sessions}:SessionListProps) => {

  return (<ul className="parking-sessions">
    {(sessions).map(s => <SessionListItem key={s.id} {...s} />)}
  </ul>)
} 

export default SessionList