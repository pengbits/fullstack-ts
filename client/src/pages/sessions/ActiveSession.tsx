
import { Link } from "react-router"
import useFetch from "@/hooks/useFetch"
import SessionDetails from "@/components/sessions/SessionDetails"
import { pretty } from "@/util/date"
import SessionsNav from "@/components/sessions/SessionsNav"

const ActiveSessionPage = () => {
  const url = "/api/parking-session"
  const {data,isLoading,isError} = useFetch(url)

  
  if(isLoading) return(<p>loading...</p>)
  if(isError)   return(<p>An error occurred.</p>)
  
  const {
    id,
    active,
    started,
    ends,
    cost,
    meter
  } = data || {}

  // if the only sessions left in db is expired, it will be returned with this shape:
  // {duration:0}
  // a more semantic response might be simply [] (empty array), but then we would have
  // to go back and change the expected response types everywhere
  return <div className="sessions-container">
    <SessionsNav />
    {(meter ? <SessionDetails 
      id={id}
      active={active}
      started={pretty(started)}
      ends={pretty(ends)}
      cost={cost}
      meter={meter}
    /> : <p>No active session. <br />
      <Link to='/'>Start a new one</Link>
    </p>)}
  </div>

}

export default ActiveSessionPage