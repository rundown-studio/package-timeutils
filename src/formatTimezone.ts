import abbreviations from './consts/timezoneAbbreviations'
import { getTimezoneOffset } from 'date-fns-tz'

type TimezoneFormatOption = 'city' | 'long' | 'abbr' | 'offset'

/**
 * Formats an IANA timezone string into a specified representation.
 *
 * @param {string} timezone - The IANA timezone string, e.g., 'America/Los_Angeles'.
 * @param {TimezoneFormatOption | TimezoneFormatOption[]} format - One of 'long', 'abbr', 'offset', or an array of these values.
 * @param {Date} date - The reference date used to determine the 'long', 'abbr' and 'offset'
 * @return {string} The formatted timezone string.
 */
export function formatTimezone (
  timezone: string,
  format: TimezoneFormatOption | TimezoneFormatOption[] = 'long',
  date: Date = new Date(),
) {
  if (!timezone) return ''

  const formatOpts: Intl.DateTimeFormatOptions = { timeZone: timezone }
  const formatArray: TimezoneFormatOption[] = Array.isArray(format) ? format : [format]

  for (const fmt of formatArray) {
    switch (fmt) {
      case 'city':
        const parts = timezone.split('/')
        return `${parts[0]} / ${parts.pop()}`.replace(/_/g, ' ')

      case 'long':
        formatOpts.timeZoneName = 'long'
        return new Intl.DateTimeFormat('en-US', formatOpts).format(date).split(', ')[1]

      case 'abbr':
        formatOpts.timeZoneName = 'long'
        const long = new Intl.DateTimeFormat('en-US', formatOpts).format(date).split(', ')[1]
        const abbr = abbreviations[long] || abbreviations[long.replace('Standard ', '')]
        if (abbr) return abbr
        break

      case 'offset':
        const offsetMilliseconds = getTimezoneOffset(timezone, date)
        const offsetMinutes = offsetMilliseconds / 60000
        const sign = offsetMinutes >= 0 ? '+' : '-'
        const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0')
        const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0')
        return `GMT${sign}${hours}:${minutes}`

      default:
        throw new Error('Format option must be one of \'city\', \'long\', \'abbr\' or \'offset\'')
    }
  }

  return ''
}
