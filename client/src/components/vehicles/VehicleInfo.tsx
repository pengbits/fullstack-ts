import useFetch from '@/hooks/useFetch'
import './VehicleInfo.css'
import type { VehicleAttributes } from '@/common/types/api/VehicleAttributes'
import { VehicleSummary } from './VehicleSummary'
import { useSelectedVehicleContext } from '@/contexts/SelectedVehicleContext'

export const VehicleInfo = () => {
  const {
    data,
    isSuccess,
    error,
    isLoading
  } = useFetch('/api/vehicles')

  const selectedVehicleId = useSelectedVehicleContext()
  
  if(isLoading) {
    return (<div className='vehicle-info loading'>
    <p>loading..</p>
    </div>)
  }


  if(isSuccess && data?.vehicles?.length){
    const {vehicles} = data
    const selected = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0]
    return <VehicleSummary {...selected} />
  }
  else return (<div className='vehicle-info error'>
    <p>{error || 'An Error occurred'}</p>
  </div>)
  
}

export default VehicleInfo