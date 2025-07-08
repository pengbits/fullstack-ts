import { useState } from "react"
import { useParams } from "react-router"
import { costForDuration, duration_options} from "@/util/meters"
import { prettyPrice } from "@/util/string"
import { pretty as prettyDate, toTimestamp } from "@/util/date"
import type { CreateSessionParams } from "@/types/api/CreateSessionParams"
import SessionFormContainer from "@/containers/SessionFormContainer"
import NewSessionConfirmation from "@/components/sessions/NewSessionConfirmation"
import type { ParkingSessionResponse } from "@/types/api/ParkingSessionResponse"
import type ParkingSessionAttributes from "@/types/api/ParkingSessionAttributes"

const NewSessionPage = () => {
  const initial_duration = duration_options[0]
  const initial_cost = costForDuration(initial_duration)
  const {meter_number} = useParams()

  const [session, setSession] = useState({} as ParkingSessionAttributes)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (attrs:CreateSessionParams) => {
    console.log(`NewSession#handleSubmit`, attrs)
    let res
    try {
      if(!attrs.id){
        console.log('CREATE')
        setIsCreating(true)
        setIsLoading(true)
        res = await createSession(attrs)
        setSession(res.parking_session)
        return res
      } else {
        console.log('UPDATE')
        setIsUpdating(true)
        setIsLoading(true)
        return Promise.resolve(attrs)
      }
    }
    catch(e){
      setIsError(true)
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }
                                                        //Promise<ParkingSessionResponse> =>
  const createSession = async (attrs:CreateSessionParams):Promise<any> => {
    const res = await fetch("/api/parking-sessions", {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(attrs)
    })
    const json:ParkingSessionResponse = await res.json()
    // simulate latency
    return new Promise(resolve => setTimeout(resolve, 1000, json))
    // return json
  }

  if(isLoading) return (
    <p>loading...</p>
  )

  if(isCreating && !isLoading) return  (
    <NewSessionConfirmation
      id={session.id}
      start_time={prettyDate(session.started)} 
      end_time={session.ends ? prettyDate(session.ends) : ''}
      cost={prettyPrice(session.cost)}
    >
    </NewSessionConfirmation>
  )
  
  if(!isCreating && !isLoading) return (
    <SessionFormContainer
      handleSubmit={handleSubmit}
      initial_duration={initial_duration}
      meter_number={meter_number}
    >
    </SessionFormContainer>
  )
}

export default NewSessionPage