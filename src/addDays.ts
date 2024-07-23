import { addMilliseconds, addDays as _addDays } from 'date-fns'
import { getTimezoneOffset } from './getTimezoneOffset'

type AddDaysOptions = {
  timezone?: string
}

/**
 * Add the specified number of days to the given date in a timezone aware manner.
 *
 * @param  {Date} date
 * @param  {number} amount
 * @param  {string} [options.timezone]
 * @return {Date}
 */
export function addDays (
  date: Date,
  amount: number,
  {
    timezone,
  }: AddDaysOptions = {},
): Date {
  if (!(date instanceof Date)) throw new Error('`date` must be an instance of Date')
  if (typeof amount !== 'number') throw new Error('`amount` must be a number')

  // If no timezone is specified, use UTC
  const tz = timezone || 'UTC'

  // Change date from UTC to sepcified timezone
  const endDate = _addDays(date, amount)
  const offset1 = getTimezoneOffset(tz, date)
  const offset2 = getTimezoneOffset(tz, endDate)
  const offsetDiff = offset1 - offset2
  const msDiff = (amount * 24 * 3600000) + offsetDiff
  const endDateAdjusted = addMilliseconds(date, msDiff)

  return endDateAdjusted
}
