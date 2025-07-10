import useFetch from "@/hooks/useFetch"
import SessionDetails from "@/components/sessions/SessionDetails"
import { pretty } from "@/util/date"
import { Link } from "react-router"

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

  return (meter ? <SessionDetails 
    id={id}
    active={active}
    started={pretty(started)}
    ends={pretty(ends)}
    cost={cost}
    meter={meter}
  /> : <p>No active session. <br />
    <Link to='/'>Start a new one</Link>
  </p>)

}

export default ActiveSessionPage