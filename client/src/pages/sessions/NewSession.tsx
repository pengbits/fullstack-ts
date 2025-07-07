import { useState } from "react"
import { useParams } from "react-router"
import { costForDuration, duration_options} from "@/util/meters"
import { prettyPrice } from "@/util/string"
import { pretty as prettyDate } from "@/util/date"

import type { CreateSessionParams } from "@/types/api/CreateSessionParams"
import { toTimestamp } from "@/util/date"
import NewSessonForm from "@/components/sessions/NewSessionForm"
import NewSessionConfirmation from "@/components/sessions/NewSessionConfirmation"

const NewSessionPage = () => {
  const initial_duration = duration_options[0]
  const initial_cost = costForDuration(initial_duration)
  const {meter_number} = useParams()
  
  const [attrs,setAttrs] = useState({
    id:null,
    meter_number,
    cost: initial_cost,
    duration: initial_duration,
    start_time: toTimestamp(new Date()),
    end_time:null
  })

  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChangeDuration = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const i = e.target.selectedIndex
    const d = duration_options[i]
    setAttrs({
      ...attrs,
      duration: d,
      cost: costForDuration(d) 
    })
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(`POST /api/sessions/`, attrs)
    setIsCreating(true)
    setIsLoading(true)
    try {
      const res = await createSession(attrs)
      if(!res.success){
        throw new Error(res.error)
      }
      const {parking_session} = res
      setAttrs({
        ...attrs,
        id: parking_session.id,
        start_time: parking_session.start,
        end_time: parking_session.end
      })
    } catch(e){
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // const createSession = (attrs:CreateParkingSessionParams) => {
  const createSession = async (attrs:CreateSessionParams):Promise<any> => {
    const res = await fetch("/api/parking-sessions", {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(attrs)
    })
    const json = await res.json()
    // simulate latency
    // return new Promise(resolve => setTimeout(resolve, 1000, json))
    return json
  }

  if(isLoading) return (
    <p>loading...</p>
  )

  if(isCreating && !isLoading) return  (
    <NewSessionConfirmation
      id={attrs.id}
      start_time={prettyDate(attrs.start_time)} 
      end_time={attrs.end_time ? prettyDate(attrs.end_time) : ''}
      cost={prettyPrice(attrs.cost)}
    >
    </NewSessionConfirmation>
  )
  
  if(!isCreating && !isLoading) return (
    <NewSessonForm
      handleSubmit={handleSubmit}
      handleChangeDuration={handleChangeDuration}
      meter_number={meter_number}
      cost={attrs.cost}
    >
    </NewSessonForm>
  )
}

export default NewSessionPage