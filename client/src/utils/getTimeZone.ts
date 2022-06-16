export const getTimeZoneAndLocation = (): string => {
  let result = ''
  const offset = new Date().getTimezoneOffset()

  if (offset < 0) {
    result = 'GMT+' + (offset / -60)
  } else {
    result = 'GMT-' + offset / 60
  }

  result = result + ':' + Intl.DateTimeFormat().resolvedOptions().timeZone
  return result
}