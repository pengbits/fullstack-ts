import { Link } from "react-router"
import { VehicleList } from "@/components/vehicles/VehicleList"
export default () => (
  <div className="vehicles">
    <h3>Choose a Vehicle:</h3>
    <VehicleList />
    <Link to='/vehicles/new'>Add a Vehicle</Link>
  </div>
)