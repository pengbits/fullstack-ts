// TODO share this with frontend
import dayjs from "dayjs"
import {Dayjs} from "dayjs"
export {Dayjs}

export const toTimestamp = (date:any) => {
  return dayjs(date).format('MM-DD-YYYY HH:mm:ss')
}
export const newDate = () => (dayjs())

export const toDate = (date:string | Date) => {
  return dayjs(date)
}

export const pretty = (dateStr:string | Dayjs) => {
  return dayjs(dateStr).format('MMM DD YYYY h:mm A')
}

export const addMins = (date:string | Dayjs, mins:number) => {
  return dayjs(date).add(mins, 'minutes')
}

export const getDuration = (starts:string | Date, ends:string | Date) => {
  return dayjs(ends).diff(dayjs(starts), 'minutes')
}