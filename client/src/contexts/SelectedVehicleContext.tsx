import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

const SelectedVehicleContext = createContext({})

const Provider = ({children}:PropsWithChildren) => {
  const [selectedVehicle,setSelectedVehicle] = useState('LWYRUP')
  return <SelectedVehicleContext value={{selectedVehicle,setSelectedVehicle}}>
    {children}
  </SelectedVehicleContext>
}

const useContext_ = () => {
  const context = useContext(SelectedVehicleContext)

  if(Object.keys(context).length === 0){
    throw new Error('SelectedVehicleContext#useContext was called outside of its Provider')
  }
  return context
}

export {
  SelectedVehicleContext, 
  useContext_ as useContext,
  Provider
}