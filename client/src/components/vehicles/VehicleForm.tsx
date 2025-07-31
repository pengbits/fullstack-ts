import { useState } from "react"
import type { VehicleAttributes } from "@/common/types/api/VehicleAttributes"

const defaultState:VehicleAttributes = {
  id:'',
  name:'',
  is_default:false
}
export const VehicleForm = ({isEditing, ...props}) => {
  const intitialState = Object.keys(props).length ? props : defaultState
  const [attrs, setAttrs] = useState<VehicleAttributes>(intitialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = isEditing ? `/api/vehicles/${attrs.id}` : `/api/vehicles`  
    console.log(url, attrs)
  }

  const handleChange = (e) => {
    const {id,value} = e.target
    setAttrs(attrs => ({
      ...attrs,
      [id] : value
    }))
  }

  return <form action="#" onSubmit={handleSubmit}>
    <p>
      <b>License Plate</b><br />
      <input id="id" type="text" onChange={handleChange}
        placeholder="AAA-1234"
        value={attrs.id} 
      />
    </p>
    <p>
      <b>Nickname</b><br />
      <input id="name" type="text" onChange={handleChange} 
        placeholder="my car"
        value={attrs.name}
      />
    </p>
    <p>
      <b>default</b><br />
      <input id="is_default" type="checkbox" onChange={handleChange}
        checked={attrs.is_default} 
      />
    </p>
    <input type="submit"/>    
  </form>
}