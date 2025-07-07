import type ParkingSessionAttributes from "./ParkingSessionAttributes"

export interface ParkingSessionResponse {
  error? : string,
  success? : boolean,
  parking_session: ParkingSessionAttributes
}