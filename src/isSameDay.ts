import { formatInTimeZone } from 'date-fns-tz'

type IsSameDayOptions = {
  timezone?: string
}

/**
 * Checks if two dates are on the same day in a given timezone.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @param {string} timezone - The IANA timezone string, defaults to 'UTC'
 * @returns {boolean} - True if both dates are on the same day in the specified timezone; false otherwise
 */
export function isSameDay (
  date1: Date,
  date2: Date,
  {
    timezone,
  }: IsSameDayOptions = {},
) {
  if (!(date1 instanceof Date)) throw new Error('`date1` must be an instance of Date')
  if (!(date2 instanceof Date)) throw new Error('`date2` must be an instance of Date')
  const tz = timezone || 'UTC'

  const dateString1 = formatInTimeZone(date1, tz, 'yyyy-MM-dd')
  const dateString2 = formatInTimeZone(date2, tz, 'yyyy-MM-dd')

  return dateString1 === dateString2
}
