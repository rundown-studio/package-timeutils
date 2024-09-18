import { TimezoneOption } from './types'
import { isSameDay as _isSameDay } from 'date-fns'
import { tz as _tz } from '@date-fns/tz'

/**
 * Checks if two dates are on the same day in a given timezone.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @param {string} [options.timezone] - The IANA timezone string, defaults to 'UTC'
 * @returns {boolean} - True if both dates are on the same day in the specified timezone; false otherwise
 */
export function isSameDay (
  date1: Date,
  date2: Date,
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
) {
  if (!(date1 instanceof Date)) throw new Error('`date1` must be an instance of Date')
  if (!(date2 instanceof Date)) throw new Error('`date2` must be an instance of Date')

  return _isSameDay(date1, date2, { in: _tz(timezone) })
}
