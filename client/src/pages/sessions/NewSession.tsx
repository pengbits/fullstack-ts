import { useState } from "react"
import { useParams } from "react-router"

const duration_options = [10,20,30,40,50,60,72,84,90,102,114,120]
const cost_per_hour = 150

const costForDuration = (minutes:number) => {
  return (minutes / 60) * cost_per_hour
}
const costPretty = (cents:number) => {
  return `$${(Math.round(cents)/ 100).toFixed(2)}`
}

const NewSessionPage = () => {
  const params = useParams()
  const {meter_number} = params
  
  const [attrs,setAttrs] = useState({
    meter_number,
    cost:25,
    duration: 10
  })
  
  const handleChangeDuration = (e:) => {
    const i = e.target.selectedIndex
    const d = duration_options[i]
    setAttrs({
      ...attrs,
      duration: d,
      cost: costForDuration(d) 
    })
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
    console.log(`POST /api/sessions/`, attrs)
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
        {costPretty(attrs.cost)}
      </p>
      <p>
        <input type="submit"></input>
      </p>
    </form>
  </div>
  )
}

export default NewSessionPage