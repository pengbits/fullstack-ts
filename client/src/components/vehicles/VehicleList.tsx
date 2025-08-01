import type { VehicleAttributes } from "@/common/types/api/VehicleAttributes"
import useFetch from "@/hooks/useFetch"
import './VehicleList.css'
import { useContext } from "@/contexts/SelectedVehicleContext"
export const VehicleList = () => {
  const {data,isLoading,isSuccess} = useFetch('/api/vehicles')
  const {
    selectedVehicle,
    setSelectedVehicle
  } = useContext()  
 
  const handleClick = (id) => {
    console.log('set active vehicle to '+id)
    setSelectedVehicle(id)
  }
  
  if(isLoading) {
    return <p>loading...</p>
  }

  if(isSuccess && data?.vehicles?.length){
    return (<ul className="vehicle-list">
      {data.vehicles.map(({id,name,is_default}:VehicleAttributes) => (
        <li key={id} className={id === selectedVehicle ? 'selected' : ''} 
          onClick={e => handleClick(id)}>
          {name}{' '}{id}{is_default && <em className="is-default">★</em>}
        </li>))}
    </ul>)
  }
}