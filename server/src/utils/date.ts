// TODO share this with frontend
import dayjs from "dayjs"

export const toTimestamp = (date:any) => {
  return dayjs(date).format('MM-DD-YYYY HH:mm:ss')
}

export const toDate = (date:string | Date) => {
  return dayjs(date)
}

export const getDuration = (starts:string | Date, ends:string | Date) => {
  return dayjs(ends).diff(dayjs(starts), 'minutes')
}