import { useState } from "react"
import { costForDuration, duration_options } from "@/util/meters"
import { addMins, newDate, Dayjs } from "@/util/date"
import SessionForm from "@/components/sessions/SessionForm"

interface SessionFormContainerProps {
  meter_number:string | undefined,
  initial_duration?: number,
  title: string,
  start_time?:Dayjs,
  end_time?:Dayjs
  handleSubmit:Function
}

const SessionFormContainer = (props:SessionFormContainerProps) => {
  const initial_duration = props.initial_duration || duration_options[0]
  const [attrs,setAttrs] = useState({
    id:null,
    meter_number: props.meter_number,
    cost: costForDuration(initial_duration),
    duration: initial_duration,
    start_time: props.start_time ? props.start_time : newDate(),
    end_time: props.end_time ? props.end_time : addMins(newDate(), initial_duration)
  })


  
  const handleChangeDuration = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const i = e.target.selectedIndex
    const d = duration_options[i]
    setAttrs({
      ...attrs,
      duration: d,
      end_time: addMins(attrs.start_time, d),
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

  // passing duration to form for state to load completely,
  // but our real use case won't need it - instead it's likely
  // that we'll want a way to set the start time to the end_time of current session,
  // and leave duration as default, because duration should represent the 'extra' time being added

  return (
    <SessionForm 
      title={props.title}
      start_time={attrs.start_time}
      end_time={attrs.end_time}
      duration={attrs.duration}
      handleChangeDuration={handleChangeDuration}
      handleSubmit={handleSubmit}
      meter_number={attrs.meter_number}
      cost={attrs.cost}
    />
  )

}

export default SessionFormContainer