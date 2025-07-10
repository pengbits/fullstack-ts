import { useState, useEffect } from "react";

interface useFetchHookReturnType {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  data: any,
  error: any
}

const useFetch = (url:string, opts:any={method:'GET'}):useFetchHookReturnType => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
       if(['PUT','POST'].includes(opts.method) && !opts.body){
        throw new Error(`method ${opts.method} assumes a body, but none was found`)
      }
      opts.headers =  {"Content-Type": "application/json"}
      setLoading(true)
      // console.log(url, opts)
      const response = await fetch(url, opts)
      const json = await response.json()
      // await new Promise(resolve => setTimeout(resolve, 1000))
      setData(json)
    } catch (e){
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    url && fetchData(url)
  },

  [url])

  return {
    isLoading: !!loading,
    isError: !!error,
    isSuccess: !error,
    data,
    error
  }
}

export default useFetch