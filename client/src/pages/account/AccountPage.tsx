import { Link } from "react-router"
export default () => (<>
  <h3>Account</h3>
  <ul>
    <li>user@hello.com</li>
    <li>Vehicles</li>
    <li><Link to="/account/payment-details">Payment Details</Link></li>
    <li>Preferences</li>
  </ul>
</>)