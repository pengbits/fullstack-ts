// TODO sync w backend
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

const default_format = 'MMM DD YYYY h:mm A'
export const pretty = (dateStr:string | Dayjs, format:string | undefined) => {
  return dayjs(dateStr).format(format || default_format)
}

export const addMins = (date:string | Dayjs, mins:number) => {
  return dayjs(date).add(mins, 'minutes')
}