import type { VehiclesResponse } from '@/common/types/api/VechiclesResponse'
import useFetch from '@/hooks/useFetch'
import './VehicleInfo.css'
import { Link } from 'react-router'
import type { VehicleAttributes } from '@/common/types/api/VehicleAttributes'



export const VehicleSummary = ({
  id,
  name
}:VehicleAttributes) => {
  return (<Link to="/vehicles" className="vehicle-info">
    <div className="header">
      <h4>Vehicle</h4>
      <p>{id}</p>
    </div>
    <div className="footer">
      <h4 className="edit-vehicle">{name}</h4>
    </div>
  </Link>)
}


export const VehicleInfo = () => {
  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading
  } = useFetch('/api/vehicles')

  if(isLoading) {
    return (<div className='vehicle-info loading'>
    <p>loading..</p>
    </div>)
  }

  if(isSuccess && data?.vehicles?.length){
    const {vehicles} = data
    const selected = vehicles.find((v:VehicleAttributes) => !!v.is_default) || vehicles[0]
    return <VehicleSummary {...selected} />
  }
  else return (<div className='vehicle-info error'>
    <p>{error}</p>
  </div>)
  
}

export default VehicleInfo