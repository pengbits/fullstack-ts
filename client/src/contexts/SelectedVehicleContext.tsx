import { createContext, useContext, useState } from "react";
import type { Dispatch, PropsWithChildren } from "react";

interface SelectedVehicleContextValue {
  selectedVehicle:string,
  setSelectedVehicle:Dispatch<React.SetStateAction<string>>
}
const SelectedVehicleContext = createContext({} as SelectedVehicleContextValue)

const Provider = ({children}:PropsWithChildren) => {
  const [selectedVehicle,setSelectedVehicle] = useState('')
  return <SelectedVehicleContext value={{selectedVehicle,setSelectedVehicle}}>
    {children}
  </SelectedVehicleContext>
}

const useSelectedVehicleContext = () => {
  const context = useContext(SelectedVehicleContext)

  if(Object.keys(context).length === 0){
    throw new Error('SelectedVehicleContext#useContext was called outside of its Provider')
  }
  return context
}

export {
  SelectedVehicleContext, 
  useSelectedVehicleContext,
  Provider,
}