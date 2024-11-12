import { getSeconds, format as dateFormat } from 'date-fns'
import { tz } from '@date-fns/tz'

type FormatTimeOfDayOptions = {
  timezone?: string
  format?: '12hNoAmPm' | '12h' | '24h'
  seconds?: 'always' | 'nonzero' | 'never'
}

/**
 * Format the time of day with timezone and format.
 *
 * @param  {Date}    date - The date object to format
 * @param  {string}  [options.timezone = 'UTC'] - The IANA timezone name, e.g., 'America/New_York'
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
    '12hNoAmPm': 'h:mm', // -> 1:20
    '12h': 'h:mm a', // -> 1:20 PM
    '24h': 'HH:mm', // -> 13:00
  }

  let timeFormat = format ? formatOptions[format] : formatOptions['24h']

  // Append seconds to the format string based on the seconds option
  if (seconds === 'always' || (seconds === 'nonzero' && getSeconds(date) !== 0)) {
    timeFormat = timeFormat.replace(':mm', ':mm:ss')
  }

  return dateFormat(date, timeFormat, { in: tz(timezone) })
}
