import {  useState } from "react"
import useFetch from "@/hooks/useFetch"
import './SearchBox.css'

interface SearchBoxProps {
  onSelectMeter : Function
} 

const meter_number_length = 7
const isValidMeterNumber = (m:string) => (
  m && m.length === meter_number_length 
)

export const SearchBox = ({onSelectMeter}:SearchBoxProps) => {
  const [search,setSearch] = useState('')
  const [isFetching,setIsFetching] = useState(false)
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    fetch
  } = useFetch(null, {defer:true})


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // TODO fetch automatically if search is long enough?
    if(isValidMeterNumber(search) && fetch){
      setIsFetching(true)
      fetch( `/api/meters/${search}`)
    }
  }

  if(!isFetching && !isLoading) return (
  <form className="searchbox" onSubmit={handleSubmit}>
    <input type="text" 
      onChange={handleChange}
      placeholder="Ender Zone ID"
      value={search} 
    />
  </form>)

  if(isLoading) return (<div className="searchbox">
    Loading...
  </div>)

  // TODO handle unhappy paths
  if(!isLoading && isFetching) {
    if(data && data.meters.length === 1) onSelectMeter(data.meters[0])
    else console.log('bad response', data, error)
    return null
  }
}

export default SearchBox