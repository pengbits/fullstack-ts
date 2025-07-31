import { useState } from "react"
import { useNavigate } from "react-router"
import type { VehicleAttributes } from "@/common/types/api/VehicleAttributes"

const defaultState:VehicleAttributes = {
  id:'',
  name:'',
  is_default:false
}
export const VehicleForm = ({isEditing, ...props}) => {
  const intitialState = Object.keys(props).length ? props : defaultState
  const [isCreating,setIsCreating] = useState(false)
  const [isError,setIsError] = useState(false)
  const [error,setError] = useState('')
  const [isSubmitting,setIsSubmitting ]= useState(false)
  const [attrs, setAttrs] = useState<VehicleAttributes>(intitialState)
  const navigate = useNavigate()
  const createVehicle = async () => {
    // const url = isEditing ? `/api/vehicles/${attrs.id}` : `/api/vehicles`  
    try {
      setIsSubmitting(true)
      setIsCreating(true)
      const res = await fetch('/api/vehicles', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(attrs)
      })
      const json = await res.json()
      if(res.status == 400) throw new Error(json.error)
      // redirect to /vehicles?
      setError('')
      setIsError(false)
      navigate('/vehicles')
    } catch(e){
      setIsError(true)
      setError(e.message)
      console.log(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createVehicle()
  }

  const handleChange = (e) => {
    const {id,value} = e.target
    setAttrs(attrs => ({
      ...attrs,
      [id] : value
    }))
  }
  
  if(isCreating && !isSubmitting && !isError){
      return <p style={{color:'green'}}>Success!</p>
  }

  return <>
    {isError && <p style={{color:'red'}}>{error}</p>}
    <form action="#" onSubmit={handleSubmit}>
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
    <input type="submit" disabled={isSubmitting} />    
  </form>
  </>
}