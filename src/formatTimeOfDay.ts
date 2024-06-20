import { getSeconds } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

type FormatTimeOfDayOptions = {
  timezone?: string
  format?: '12h' | '24h'
  seconds?: 'always' | 'nonzero' | 'never'
}

/**
 * Format the time of day with timezone and format.
 *
 * @param  {Date}    date - The date object to format
 * @param  {string}  [options.timezone] - The IANA timezone name, e.g., 'America/New_York'
 * @param  {string}  [options.format = '24h'] - The time format, either '12h' or '24h'
 * @param  {string}  [options.seconds = 'always'] - When to display seconds: 'always', 'nonzero', or 'never'
 * @return {string} - The formatted time string
 */
export function formatTimeOfDay (
  date: Date,
  {
    timezone = 'UTC',
    format = '24h',
    seconds = 'always',
  }: FormatTimeOfDayOptions = {},
): string {
  const formatOptions: Record<string, string> = {
    '12h': 'hh:mm a',
    '24h': 'HH:mm',
  }

  let timeFormat = formatOptions[format]

  // Append seconds to the format string based on the seconds option
  if (seconds === 'always' || (seconds === 'nonzero' && getSeconds(date) !== 0)) {
    timeFormat = timeFormat.replace(':mm', ':mm:ss')
  }

  // Convert the date to the specified timezone
  // let zonedDate = date
  // if (timezone) {
  //   const utcDate = zonedTimeToUtc(date, timezone)
  //   zonedDate = utcToZonedTime(utcDate, timezone)
  // }

  return formatInTimeZone(date, timezone, timeFormat)
}
