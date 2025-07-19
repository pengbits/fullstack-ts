import { Link } from "react-router"
import "./Nav.css"
export const Nav = () => (
<footer className="nav-container">
  <nav className="nav">
    <Link className="parking" to="/">
      <i className="icon parking"></i>
      Parking
    </Link>
    <Link className="sessions" to="/sessions/active">
      <i className="icon sessions"></i>
      My Sessions
    </Link>
    <Link className="account" to="/account">
      <i className="icon account"></i>
      My Account
    </Link>
  </nav>
</footer>)

export default Nav