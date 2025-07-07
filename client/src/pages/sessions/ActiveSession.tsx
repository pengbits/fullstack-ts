import useFetch from "@/hooks/useFetch"
import SessionDetails from "@/components/sessions/SessionDetails"
import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"
import { pretty } from "@/util/date"
const ActiveSessionPage = () => {
  const url = "/api/parking-session"
  const {data,isLoading,isError} = useFetch(url)

  
  if(isLoading) return(<p>loading!...</p>)
  if(isError)   return(<p>An error occurred.</p>)
  
  const {
    id,
    active,
    started,
    ends,
    meter
  } = data || {}
  
  return (meter && <SessionDetails 
    id={id}
    active={active}
    started={pretty(started)}
    ends={pretty(ends)}
    meter={meter}
  />)

}

export default ActiveSessionPage