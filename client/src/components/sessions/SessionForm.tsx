import { toTimestamp, Dayjs } from "@/util/date"
import { duration_options} from "@/util/meters"
import { prettyPrice } from "@/util/string"
import type { ChangeEventHandler, FormEventHandler } from "react"

interface SessionFormProps {
  title:string,
  meter_number?:string,
  start_time:Dayjs,
  end_time?:Dayjs,
  duration?:number,
  cost:number,
  handleSubmit:FormEventHandler<HTMLFormElement>,
  handleChangeDuration:ChangeEventHandler<HTMLSelectElement>,
}

const SessionForm = ({
  title,
  meter_number,
  cost,
  start_time,
  end_time,
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
      <p><b>Start Time:</b><br />
        {toTimestamp(start_time)}
      </p>
      <p><b>End Time:</b><br />
        {end_time ? toTimestamp(end_time) : null}
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