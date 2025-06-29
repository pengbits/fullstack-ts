export interface MeterResponse {
  meter_number: number,
  side_of_street: string,
  on_street: string,
  lat: number,
  long: number 
}

export interface MetersResponse {
  error? : unknown,
  meters: MeterResponse[]
}