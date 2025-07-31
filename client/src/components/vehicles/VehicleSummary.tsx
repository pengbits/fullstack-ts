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