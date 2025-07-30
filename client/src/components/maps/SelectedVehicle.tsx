import './SelectedVehicle.css'
import { Link } from 'react-router'

export const SelectedVehicle = () => {
  return (<Link to="/vehicles" className="selected-vehicle">
    <div className="header">
      <h4>Vehicle</h4>
      <p>JNT-1094</p>
    </div>
    <div className="footer">
      <h4 className="edit-vehicle">My Honda</h4>
    </div>
    
  </Link>)
}

export default SelectedVehicle