import throttle from 'lodash.throttle'
import {  useState, useEffect, useMemo, useCallback } from "react"
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
  const [url,setUrl] = useState('')
  const [isFetching,setIsFetching] = useState(false)
  const {
    isLoading,
    isError,
    error,
    data,
  } = useFetch(url)

  const setUrlThrottled = useMemo(
    () => throttle((url: string) => {
      setUrl(url)
    }, 500),
    []
  )

  useEffect(() => {
    return () => setUrlThrottled.cancel()
  }, [setUrlThrottled])

  const handleChange = (e) => {
    setSearch(e.target.value)
    if(isValidMeterNumber(e.target.value)){
      setIsFetching(true)
      setUrlThrottled(`/api/meters/${e.target.value}`)
    }
  }

  const handleReset = (e) => {
    setSearch('')
    setIsFetching(false)
  }


  if(!isFetching && !isLoading) return (
  <form className="searchbox">
    <input type="text" 
      onChange={handleChange}
      placeholder="Ender Zone ID"
      value={search} 
    />
    {search.length > 0 && <span onClick={handleReset}
      className="closer">x</span>}
  </form>)

  if(isLoading) return (<div className="searchbox">
    Loading...
  </div>)

  if(isError) {
    return (<div className="searchbox error">
      {error.message} <span onClick={handleReset}
      className="closer">x</span>
    </div>)
  }
  // TODO add a way to recover from errors
  if(!isLoading && isFetching) {
    if(data && data.meters.length === 1) onSelectMeter(data.meters[0])
    else console.log('bad response', data, error)
    return null
  }
}

export default SearchBox