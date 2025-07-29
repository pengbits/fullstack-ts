import type {ParkingSessionAttributes} from "@/common/types/api/ParkingSessionAttributes"
import SessionListItem from "./SessionListItem"
import "./SessionList.css"

interface SessionListProps {
  sessions : Array<ParkingSessionAttributes>
}

const SessionList = ({sessions}:SessionListProps) => {
  return (<ul className="parking-sessions">
    {(sessions).map(s => <SessionListItem key={s.id} {...s} />)}
  </ul>)
} 

export default SessionList