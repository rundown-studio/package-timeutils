import { TimezoneOption } from './types'
import { getTimezoneOffset } from './getTimezoneOffset'
import { addMilliseconds } from 'date-fns/addMilliseconds'

/**
 * Returns the start of the day (00:00:00) in the specified timezone for a given date.
 *
 * @param {Date} [time] - The date and time for which the start of the day is to be determined. If not provided, the current date and time is used.
 * @param {string} [options.timezone='UTC'] - The timezone identifier in which the start of the day should be calculated. Defaults to 'UTC'.
 * @returns {Date} A `Date` object representing the start of the day (00:00:00) in the specified timezone, converted back to UTC.
 */
export function getStartOfDay (
  time: Date = new Date(),
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
): Date {
  if (!(time instanceof Date)) throw new Error('`time` must be a valid Date')

  // Apply target timezone (UTC -> zoned)
  const tzOffset = timezone ? getTimezoneOffset(timezone, time) : 0
  const inZone = addMilliseconds(time, tzOffset)

  // Move time to 0:00:00
  inZone.setUTCHours(0, 0, 0, 0)

  // Revert to UTC (zoned -> UTC)
  return addMilliseconds(inZone, -tzOffset)
}
