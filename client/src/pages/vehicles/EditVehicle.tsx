import { useParams } from "react-router"
import useFetch from "@/hooks/useFetch"
import { VehicleForm } from "@/components/vehicles/VehicleForm"

export default () => {
  const params = useParams()
  const {id} = params
  const {data,isLoading,isError,isSuccess,error} = useFetch(`/api/vehicles/${id?.toUpperCase()}`)
  
  if(isLoading){
    return <div className="edit-vehicle loading">
      <p>Loading...</p>
    </div>
  }

  if(isError){
    return <div className="edit-vehicle error">
      <p>{error.message}.</p>
    </div>
  }

  if(isSuccess && data){
    const {vehicle} = data
    return <div className="edit-vehicle">
      <VehicleForm isEditing={true} {...vehicle} />
  </div>
  }
}