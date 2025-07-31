import { createContext, useContext} from "react";

export const SelectedVehicleContext = createContext('')
export const useSelectedVehicleContext = () => (useContext(SelectedVehicleContext))