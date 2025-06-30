import dayjs from "dayjs"

export const toTimestamp = (date:any) => {
  return dayjs(date).format('MM-DD-YYYY HH:mm:ss')
}

export const toDate = (dateStr:string) => {
  return dayjs(dateStr)
}