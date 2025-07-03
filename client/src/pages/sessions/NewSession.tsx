import { useState } from "react"
import { useParams } from "react-router"
const NewSessionPage = () => {
  const params = useParams()
  const {meter_number} = params
  
  const [attrs,setAttrs] = useState({
    meter_number,
    duration: 10
  })
  
  const handleChangeDuration = (e) => {
    console.log(e.target.selectedIndex)
  }

  return (<>
    <h3>New Session</h3>
    <form action="#">
      <p>
        <b>Meter Number</b><br />
        {meter_number}
      </p>
      <p>
        <b>Duration</b>
        <select onChange={handleChangeDuration}>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>60</option>
          <option>72</option>
          <option>84</option>
          <option>90</option>
        </select>
      </p>
    </form>
  </>
  )
}

export default NewSessionPage