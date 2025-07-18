import './App.css'
import {Outlet} from 'react-router'
import Nav from '@/components/Nav'

function App() {
  return (<>
    <div className="main">
      <Outlet />
    </div>
    <Nav />
  </>)

}

export default App
