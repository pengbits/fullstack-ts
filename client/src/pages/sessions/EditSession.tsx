import { useEffect, useState } from "react"
import { prettyPrice } from "@/util/string"
import { pretty as prettyDate, toDate } from "@/util/date"
import type { CreateSessionParams } from "@/types/api/CreateSessionParams"
import SessionFormContainer from "@/containers/SessionFormContainer"
import NewSessionConfirmation from "@/components/sessions/NewSessionConfirmation"
import type { ParkingSessionResponse } from "@/types/api/ParkingSessionResponse"
import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"

const NewSessionPage = () => {

  const [session, setSession] = useState({} as ParkingSessionAttributes)
  const [isReading, setIsReading] = useState(false)
  const [isUpdating, setisUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchSession = async () => {
    try {
      setIsReading(true)
      setIsLoading(true)
      const res = await fetch("/api/parking-session")
      const json = await res.json()
      await new Promise(resolve => setTimeout(resolve, 1000, {}))
      setSession(json)
    } catch(e){
      setIsError(true)
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (attrs:CreateSessionParams) => {
    console.log(`EditSession#handleSubmit`, attrs)
    try {
        console.log('UPDATE', attrs)
        setisUpdating(true)
        setIsLoading(true)
        const res = await updateSession(attrs)
        setSession(res.parking_session)
        return res
    }
    catch(e){
      setIsError(true)
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }

  const updateSession = async ({duration}:any):Promise<any> => {
    const res = await fetch("/api/parking-session", {
      method:'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        duration
      })
    })
    const json:ParkingSessionResponse = await res.json()
    return json
  }

  useEffect(() => {
    console.log('load from state')
    fetchSession()
  }, [])

  if(isLoading) return (
    <p>loading...</p>
  )
  

  if(isError) return (
    <p>An error occurred</p>
  )


  if(isUpdating && !isLoading) {
    return  (
    <NewSessionConfirmation
      id={session.id}
      start_time={prettyDate(session.started)} 
      end_time={session.ends ? prettyDate(session.ends) : ''}
      cost={prettyPrice(session.cost)}
    >
    </NewSessionConfirmation>
    )
  }
  
  if(isReading && !isLoading) {
    return (
    <SessionFormContainer
      title='Extend Parking Session'
      start_time={toDate(session.started)}
      end_time={session.ends ? toDate(session.ends): undefined}
      initial_duration={session.duration}
      handleSubmit={handleSubmit}
      meter_number={session.meter.meter_number}
    >
    </SessionFormContainer>
    )
  }
}

export default NewSessionPage