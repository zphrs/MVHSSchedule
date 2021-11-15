import getPeriodsOnDay from './getPeriodsOnDay'
import { Period } from './Period'

export default async function timeOfPeriod(
  period: number,
  date: Date
): Promise<Period> {
  return (await getPeriodsOnDay(date))[period]
}
