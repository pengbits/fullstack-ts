export const prettyPrice = (cents:number) => {
  return `$${(Math.round(cents)/ 100).toFixed(2)}`
}
