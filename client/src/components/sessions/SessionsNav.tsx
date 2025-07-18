import { Link, useLocation } from "react-router"
import './SessionsNav.css'

export default () => {
  const {pathname} = useLocation()
  const path = pathname.split('/').pop()
  return (
  <nav className="sessions-nav">
    <Link className={path === 'active' ? 'active' : ''} to='/sessions/active'>Active</Link>
    <Link className={path === 'past' ? 'active' : ''} to='/sessions/past'>Past</Link>
  </nav>)
}