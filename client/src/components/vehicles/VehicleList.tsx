import type { VehicleAttributes } from "@/common/types/api/VehicleAttributes"
import useFetch from "@/hooks/useFetch"
import './VehicleList.css'

export const VehicleList = () => {
  const {data,isLoading,isSuccess} = useFetch('/api/vehicles')
  
  const handleClick = (id) => {
    console.log('set active vehicle to '+id)
  }
  
  if(isLoading) {
    return <p>loading...</p>
  }

  if(isSuccess && data?.vehicles?.length){
    return (<ul className="vehicle-list">
      {data.vehicles.map(({id,name}:VehicleAttributes) => (
        <li key={id} onClick={e => handleClick(id)}>
          {name}{' '}{id}
        </li>))}
    </ul>)
  }
}