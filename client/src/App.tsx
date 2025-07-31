import './App.css'
import {Outlet} from 'react-router'
import Nav from '@/components/nav/Nav'
import { SelectedVehicleContext } from './contexts/SelectedVehicleContext'

function App() {
  return (<>
      <div className="main">
        <SelectedVehicleContext value='BADMN1'>
          <Outlet />
        </SelectedVehicleContext>
      </div>
      <Nav />
  </>)

}

export default App
