import getPeriodsOnDay from './getPeriodsOnDay'
import { Period } from './Period'

export default async function getPeriodsFromDayCount(
  day: Date,
  dayCount: number
): Promise<Period[][]> {
  const periods = []
  for (let i = 0; i < dayCount; i++) {
    periods.push(
      await getPeriodsOnDay(new Date(day.getTime() + i * 24 * 60 * 60 * 1000))
    )
  }
  return periods
}
