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

  // Change dates from UTC to specified timezone
  const timeOffset = getTimezoneOffset(tz, time)
  const timeInZone = addMilliseconds(time, timeOffset)
  const dateOffset = getTimezoneOffset(tz, date)
  const dateInZone = addMilliseconds(date, dateOffset)

  // Perform the actual applying of the date
  // Note: Has to use the UTC variants to avoid interference of system timezone
  // Note: Must set year, month, day atomically to avoid month overflow (e.g. Jan 31 -> setMonth(Feb) rolls to Mar)
  const outputInZone = new Date(timeInZone)
  outputInZone.setUTCFullYear(dateInZone.getUTCFullYear(), dateInZone.getUTCMonth(), dateInZone.getUTCDate())

  // Change output from specified timezone back to UTC
  // Note: Recalculate offset because the output may land on a different side of a DST boundary than dateInUTC
  const outputOffset = getTimezoneOffset(tz, addMilliseconds(outputInZone, -dateOffset))
  const inUTC = addMilliseconds(outputInZone, -outputOffset)

  // console.log(
  //   '[applyDate]',
  //   { tz, dstShift: dateOffset - timeOffset },
  //   { time, timeS: time.toString(), timeInZone, offset: timeOffset },
  //   { date, dateS: date.toString(), dateInZone, offset: dateOffset },
  //   { inUTC, inUtcS: inUTC.toString(), outputInZone, offset: -dateOffset },
  // )

  return inUTC
}
