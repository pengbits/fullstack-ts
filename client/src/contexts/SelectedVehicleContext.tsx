import { createContext, useContext, useState } from "react";
import type { Dispatch, PropsWithChildren } from "react";

interface SelectedVehicleContextValue {
  selectedVehicle:string,
  setSelectedVehicle:Dispatch<React.SetStateAction<string>>
}
const SelectedVehicleContext = createContext({} as SelectedVehicleContextValue)

const DEFAULT_VEHICLE = 'DEFAULT_VEHICLE'
const Provider = ({children}:PropsWithChildren) => {
  const [selectedVehicle,setSelectedVehicle] = useState(DEFAULT_VEHICLE)
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
  Provider,
  DEFAULT_VEHICLE
}