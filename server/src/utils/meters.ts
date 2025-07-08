export const cost_per_hour = 150
export const duration_options = [10,20,30,40,50,60,72,84,90,102,114,120]
export const costForDuration = (minutes:number) => {
  return (minutes / 60) * cost_per_hour
}

