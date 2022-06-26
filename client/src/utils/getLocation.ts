export const getLocation = (): Array<string> => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')    // [country, city]
}