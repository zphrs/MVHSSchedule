function getDateFromYearMonthWeekDay(
  year: number,
  month: number,
  week: number,
  day: number
): Date {
  const date = new Date(year, month - 1, 1)
  date.setDate(date.getDate() + week * 7 + day - date.getDay())
  return date
}

function isDateInPST(date: Date): boolean {
  // pst is from the second Sunday in March to the first Sunday in November
  const pstStart = getDateFromYearMonthWeekDay(date.getFullYear(), 3, 2, 0)
  const pstEnd = getDateFromYearMonthWeekDay(date.getFullYear(), 11, 1, 0)
  return date >= pstStart && date < pstEnd
}

export function fromStr(day: Date, str: string) {
  // in PST
  const date = new Date(day)
  const [hour, minute] = [
    Number.parseInt(str.slice(0, 2)),
    Number.parseInt(str.slice(2, 4))
  ]
  date.setUTCHours(0, 0, 0, 0)
  if (!isDateInPST(date)) {
    date.setUTCHours(hour + 8, minute)
  } else {
    date.setUTCHours(hour + 7, minute)
  }
  return date
}

export function toStr(date: Date) {
  // in format mmddyyyy and time in pst
  return date
    .toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'PST'
    })
    .replace(/:/g, '')
}
