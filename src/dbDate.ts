export function fromStr(str: string) {
  // in pst
  return new Date(
    Number.parseInt(str.slice(4, 8)),
    Number.parseInt(str.slice(0, 2)) - 1,
    Number.parseInt(str.slice(2, 4))
  )
}

export function toStr(date: Date) {
  // in format mmddyyyy and time in pst
  return date
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '')
}
