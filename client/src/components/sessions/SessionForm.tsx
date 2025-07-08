import { duration_options} from "@/util/meters"
import { prettyPrice } from "@/util/string"
import type { ChangeEventHandler, FormEventHandler } from "react"

interface SessionFormProps {
  title:string,
  meter_number?:string,
  cost:number,
  duration:number,
  handleSubmit:FormEventHandler<HTMLFormElement>,
  handleChangeDuration:ChangeEventHandler<HTMLSelectElement>,
}

const SessionForm = ({
  title,
  meter_number,
  cost,
  duration,
  handleSubmit,
  handleChangeDuration
}:SessionFormProps) => {
  return (
  <div style={{padding:'15px'}}>
    <h3>{title}</h3>
    <form action="#" onSubmit={handleSubmit}>
      <p>
        <b>Meter Number</b><br />
        {meter_number}
      </p>
      <p>
        <b>Duration</b>{' '}
        <select onChange={handleChangeDuration} defaultValue={duration}>
          {duration_options.map(val => <option 
            key={val}>{val}</option>
          )}
        </select>
      </p>
      <p>
        <b>Cost</b><br />
        {prettyPrice(cost)}
      </p>
      <p>
        <input type="submit"></input>
      </p>
    </form>
  </div>
  )
}
export default SessionForm