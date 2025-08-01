import './App.css'
import {Outlet} from 'react-router'
import Nav from '@/components/nav/Nav'
import { Provider } from './contexts/SelectedVehicleContext' 

function App() {

  return (<>
      <div className="main">
        <Provider>
          <Outlet />
        </Provider>
      </div>
      <Nav />
  </>)

}

export default App
