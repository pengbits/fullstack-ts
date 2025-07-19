import useFetch from "@/hooks/useFetch"
import SessionList from "@/components/sessions/SessionList"
import SessionsNav from "@/components/sessions/SessionsNav"

const PastSessionsPage = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    data
  }  = useFetch('/api/parking-sessions')

  return (<div className="sessions-container">
    <SessionsNav />
    {renderContent({data,isError,isLoading,isSuccess})}
  </div>)
}

interface ContentProps {
  data: any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean
}

const renderContent = ({data,isLoading,isSuccess,isError}:ContentProps) => {
  if(isSuccess && data?.sessions) return (
      <SessionList sessions={data.sessions} />
  )

  if(isError) {
    (<div className="parking-sessions error">
      <p>An Error occurred</p>
    </div>)
  }

  if(isLoading) return (
      <p>Loading...</p>
  )
}

export default PastSessionsPage