import './App.css'
import { useEffect } from 'react'
function App() {
  
  const loadGreeting = async () => {
    const res = await fetch('/api')
    const json = await res.json()
    console.log(json.greeting, '')
  }

  useEffect(() => {
    loadGreeting()
  }, [])

  return (
    <>
      <h1>Ahoy</h1>
    </>
  )
}

export default App
