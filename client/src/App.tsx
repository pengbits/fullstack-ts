import './App.css'
import {Outlet} from 'react-router'
import Nav from '@/components/nav/Nav'

function App() {
  return (<>
    <div className="main">
      <Outlet />
    </div>
    <Nav />
  </>)

}

export default App
