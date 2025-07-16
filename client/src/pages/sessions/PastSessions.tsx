import useFetch from "@/hooks/useFetch"
import SessionList from "@/components/sessions/SessionList"

const PastSessionsPage = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    data
  }  = useFetch('/api/parking-sessions')

  return (
    <div className="parking-sesions">
      {isLoading ? <p>loading...</p> : isSuccess && <SessionList sessions={data?.sessions} />}
    </div>
  )

}

export default PastSessionsPage