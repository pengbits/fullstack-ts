import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.tsx'
import MapPage from './pages/maps/Map.tsx'
import NewSessionPage     from './pages/sessions/NewSession'
import EditSessionPage from './pages/sessions/EditSession.tsx';
import ConfirmSessionPage from './pages/sessions/ConfirmSession'
import ActiveSessionPage  from './pages/sessions/ActiveSession'
import PastSessionsPage from './pages/sessions/PastSessions.tsx';
import AccountPage from './pages/account/AccountPage.tsx';
import PaymentDetailsPage from './pages/account/PaymentDetailsPage.tsx';

const router = createBrowserRouter([
  {
    Component: App,
    children: [{
      index:true,
      Component: MapPage
    },{
      path:'/sessions/new/:meter_number',
      Component: NewSessionPage
    },{
      path:'/sessions/extend',
      Component: EditSessionPage
    },{
      path:'/sessions/confirm',
      Component: ConfirmSessionPage
    },{
      path:'/sessions/active',
      Component: ActiveSessionPage
    },{
      path:'/sessions/past',
      Component: PastSessionsPage
    },{
      path:'/account',
      Component: AccountPage
    },{
      path:'/account/payment-details',
      Component: PaymentDetailsPage
    }]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
