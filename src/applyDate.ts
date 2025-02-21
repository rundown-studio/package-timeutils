import { addMilliseconds } from 'date-fns'
import { getTimezoneOffset } from './getTimezoneOffset'
import { isSameDay } from './isSameDay'

type ApplyDateOptions = {
  timezone?: string
}

/**
 * Apply year-month-day to a JS date.
 *
 * @param  {Date} time - the JS Date to be changed
 * @param  {Date} date - the JS Date to take the year-month-day from
 * @param  {string} [options.timezone] - an optional IANA timezone like 'Europe/Berlin'
 * @return {Date}
 */
export function applyDate (
  time: Date,
  date: Date,
  {
    timezone,
  }: ApplyDateOptions = {},
): Date {
  if (!(time instanceof Date)) throw new Error('`time` must be an instance of Date')
  if (!(date instanceof Date)) throw new Error('`date` must be an instance of Date')
  if (isSameDay(time, date, { timezone })) return time
  const tz = timezone || 'UTC'

  // Change dates from UTC to sepcified timezone
  const timeOffset = getTimezoneOffset(tz, time)
  const timeInZone = addMilliseconds(time, timeOffset)
  const dateOffset = getTimezoneOffset(tz, date)
  const dateInZone = addMilliseconds(date, dateOffset)

  // Perform the actual applying of the date
  // Note: Order is important, year -> month -> day (otherwise funny things happen in leap years with Feb 28)
  // Note: Has to use the UTC variants to avoid interference of system timezone
  const outputInZone = new Date(timeInZone)
  outputInZone.setUTCFullYear(dateInZone.getUTCFullYear())
  outputInZone.setUTCMonth(dateInZone.getUTCMonth())
  outputInZone.setUTCDate(dateInZone.getUTCDate())

  // Change output from sepcified timezone back to UTC
  // Note: We guess that the dateOffset is likely identical to the final inUTC offset
  const inUTC = addMilliseconds(outputInZone, -dateOffset)

  // console.log(
  //   '[applyDate]',
  //   { tz, dstShift: dateOffset - timeOffset },
  //   { time, timeS: time.toString(), timeInZone, offset: timeOffset },
  //   { date, dateS: date.toString(), dateInZone, offset: dateOffset },
  //   { inUTC, inUtcS: inUTC.toString(), outputInZone, offset: -dateOffset },
  // )

  return inUTC
}
