import { useState , useEffect} from "react"
import {newDate, toDate} from "@/util/date"

interface CountDownWidgetProps  {
  ends: string
}

interface TimeObject {
  hours:number,
  mins:number,
  seconds:number
}
const pad = (n:number) => {
  const s = `${n}`
  return s.length == 1 ? `0${s}` : s
}

const render = ({hours,mins,seconds}:TimeObject) => {
  return <p>
    {pad(hours)}:
    {pad(mins)}:
    {pad(seconds)}
  </p>
}

export const CountDownWidget = ({ends}:CountDownWidgetProps) => {
  let now = newDate()
  let id:any
  
  const [time,setTime] = useState({
    hours:0,
    mins:0,
    seconds:0
  } as TimeObject)

  const update = () => {
    let t = {} as TimeObject, remainingHours, remainingSeconds, diff;
   
    now = now.add(1, 'second')
    diff = toDate(ends).diff(now, 'second', true)
   
    t.hours           = Math.floor(diff / 3600)
    remainingHours    = diff % 3600
    t.mins            = Math.floor(remainingHours / 60)
    remainingSeconds  = remainingHours % 60
    t.seconds         = Math.floor(remainingSeconds)

    console.log(diff)
    setTime(t)
  }

  // id needs to be a ref to persist across updates
  useEffect(() => {
    id = setInterval(update, 1000)
    return () => (clearInterval(id))
  }, [ends])
  
  if(time.hours > 0 && time.mins > 0 && time.seconds > 0){
    return render(time)
  } else {
    // this doesn't work
    clearInterval(id)
    return <p>Expired!</p>
  }
  
}

export default CountDownWidget