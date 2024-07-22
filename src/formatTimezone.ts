import abbreviations from './consts/timezoneAbbreviations'

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

      case 'offset': {
        let offset = ''
        try {
          formatOpts.timeZoneName = 'longOffset' // Note: Typescript parser may be outdated, 'longOffset' is valid
          offset = new Intl.DateTimeFormat('en-US', formatOpts).format(date).split(', ')[1]
        } catch {
          formatOpts.timeZoneName = 'short'
          offset = new Intl.DateTimeFormat('en-US', formatOpts).format(date).split(', ')[1]
        }
        return offset === 'GMT' ? 'GMT+00:00' : offset
      }

      default:
        throw new Error('Format option must be one of \'city\', \'long\', \'abbr\' or \'offset\'')
    }
  }

  return ''
}
