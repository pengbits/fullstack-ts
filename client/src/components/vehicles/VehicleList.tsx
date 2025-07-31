import type { VehicleAttributes } from "@/common/types/api/VehicleAttributes"
import useFetch from "@/hooks/useFetch"
import './VehicleList.css'
import { useSelectedVehicleContext } from "@/contexts/SelectedVehicleContext"
export const VehicleList = () => {
  const {data,isLoading,isSuccess} = useFetch('/api/vehicles')
  const selectedVehicleId = useSelectedVehicleContext()  
 
  const handleClick = (id) => {
    console.log('set active vehicle to '+id)
  }
  
  if(isLoading) {
    return <p>loading...</p>
  }

  if(isSuccess && data?.vehicles?.length){
    return (<ul className="vehicle-list">
      {data.vehicles.map(({id,name}:VehicleAttributes) => (
        <li key={id} className={id === selectedVehicleId ? 'selected' : ''} 
          onClick={e => handleClick(id)}>
          {name}{' '}{id}{' '}{id === selectedVehicleId ? '√':''}
        </li>))}
    </ul>)
  }
}