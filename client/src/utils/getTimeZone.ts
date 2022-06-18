export const getTimeZone = (): string => {
  let result = ''
  const offset = new Date().getTimezoneOffset()

  if (offset < 0) {
    result = 'GMT+' + (offset / -60)
  } else {
    result = 'GMT-' + offset / 60
  }
  return result
}