import fetchFromDb from "./fetchFromDb"
import { Period } from "./Period"
import * as time from "./dbTime"

export default async function periodsFromSchedule(
  date: Date,
  schedule: String
): Promise<Period[]> {
  const periods = await fetchFromDb("schedules/" + schedule)
  let out = []
  for (let key in periods) {
    const period = key
    const [start, end] = period.split("-")
    out.push({
      start: time.fromStr(date, start),
      end: time.fromStr(date, end),
      period: periods[key]
    })
  }
  return out
}
