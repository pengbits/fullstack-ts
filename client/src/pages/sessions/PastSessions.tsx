import useFetch from "@/hooks/useFetch"
import SessionList from "@/components/sessions/SessionList"

const PastSessionsPage = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data
  }  = useFetch('/api/parking-sessions')

  if(isSuccess && data?.sessions) return (
    <div className="parking-sessions">
      <SessionList sessions={data.sessions} />
    </div>
  )
  if(isError) {
    console.log(error)
    return (<div className="parking-sessions error">
      <p>An Error occurred</p>
    </div>)
  }

  if(isLoading) return (
    <div className="parking-sessions">
      <p>Loading...</p>
  </div>)

}

export default PastSessionsPage