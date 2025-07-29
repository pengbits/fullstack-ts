import ParkingSessionAttributes from "./ParkingSessionAttributes"

export interface ParkingSessionResponse {
  error? : unknown,
  success? : boolean,
  parking_session: ParkingSessionAttributes
}