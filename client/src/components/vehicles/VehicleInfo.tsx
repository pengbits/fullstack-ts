import useFetch from '@/hooks/useFetch'
import './VehicleInfo.css'
import type { VehicleAttributes } from '@/common/types/api/VehicleAttributes'
import { VehicleSummary } from './VehicleSummary'
import { useContext } from '@/contexts/SelectedVehicleContext'
export const VehicleInfo = () => {
  const {
    data,
    isSuccess,
    error,
    isLoading
  } = useFetch('/api/vehicles')

  const {selectedVehicle} = useContext()

  if(isLoading) {
    return (<div className='vehicle-info loading'>
    <p>loading..</p>
    </div>)
  }


  if(isSuccess && data?.vehicles?.length){
    const {vehicles} = data
    const selected = vehicles.find(v => v.id === selectedVehicle) || vehicles[0]
    return <VehicleSummary {...selected} />
  }
  else return (<div className='vehicle-info error'>
    <p>{error || 'An Error occurred'}</p>
  </div>)
  
}

export default VehicleInfo