import { useState } from "react"
import { costForDuration, duration_options } from "@/util/meters"
import { toTimestamp } from "@/util/date"
import SessionForm from "@/components/sessions/SessionForm"

interface SessionFormContainerProps {
  meter_number:string | undefined,
  initial_duration:number,
  handleSubmit:Function
}
const SessionFormContainer = (props:SessionFormContainerProps) => {
  
  const [attrs,setAttrs] = useState({
    id:null,
    meter_number: props.meter_number,
    cost: costForDuration(props.initial_duration),
    duration: props.initial_duration,
    start_time: toTimestamp(new Date()),
    end_time:null
  })

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
    // setIsCreating(true)
    // setIsLoading(true)

    const res = await props.handleSubmit(attrs)
    setAttrs({
      ...attrs,
      id: res.id,
      start_time: res.started,
      end_time: res.ends,
      // cost?
    })

  } 


  return (
    <SessionForm 
      handleChangeDuration={handleChangeDuration}
      handleSubmit={handleSubmit}
      meter_number={attrs.meter_number}
      cost={attrs.cost}
    />
  )

}

export default SessionFormContainer