import { useState, useEffect } from "react"
import { useParams } from "react-router"
import useFetch from "@/hooks/useFetch"
import { costForDuration, duration_options} from "@/util/meters"
import { prettyPrice } from "@/util/string"
import type { CreateParkingSessionParams } from "@/types/api/CreateSessionParams"
import { toTimestamp } from "@/util/date"

// const createSession = (attrs:CreateParkingSessionParams) => {
const createSession =async (attrs:any) => {
  try {
    const res = await fetch("/api/parking-sessions", {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(attrs)
    })
    const json = await res.json()
    return json
  } catch(e:any){
    console.log(e)
  }
}


const NewSessionPage = () => {
  const params = useParams()
  const {meter_number} = params
  
  const [attrs,setAttrs] = useState({
    meter_number,
    cost:25,
    duration: 10,
    start_time: toTimestamp(new Date())
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
    console.log('submit')
    console.log(`POST /api/sessions/`, attrs)
    const res = await createSession(attrs)
    console.log(res)
  }
  

  return (<div
    style={{padding:'15px'}}
    >
    <h3>New Session</h3>
    <form action="#" onSubmit={handleSubmit}>
      <p>
        <b>Meter Number</b><br />
        {meter_number}
      </p>
      <p>
        <b>Duration</b>
        <select onChange={handleChangeDuration}>
          {duration_options.map(val => <option key={val}>{val}</option>)}
        </select>
      </p>
      <p>
        <b>Cost</b><br />
        {prettyPrice(attrs.cost)}
      </p>
      <p>
        <input type="submit"></input>
      </p>
    </form>
  </div>
  )
}

export default NewSessionPage