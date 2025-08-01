import { createContext, useContext, useState, type PropsWithChildren } from 'react'

export const useSelectedVehicle = () => {
  const [selectedVehicle,setSelectedVehicle] = useState('')
  const SelectedVehicleContext = createContext('')


  const wrapWithContext = ({children}:PropsWithChildren) => {
    return (
      <SelectedVehicleContext value={selectedVehicle}>
        {children}
      </SelectedVehicleContext>
    )
  }
  
  const useSelectedVehicleContext = () => {
    return useContext(SelectedVehicleContext)
  }

  return {
    selectedVehicle,
    setSelectedVehicle,
    Context: wrapWithContext,
    useContext: useSelectedVehicleContext
  }
}