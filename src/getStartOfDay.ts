import { TimezoneOption } from './types'
import { getTimezoneOffset } from './getTimezoneOffset'
import { addMilliseconds } from 'date-fns/addMilliseconds'

export function getStartOfDay (
  time: Date,
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
): Date {
  if (!(time instanceof Date)) throw new Error('`time` must be a valid Date')

  // Step 1: Determine now (new Date() carries no timezone info, always in UTC)
  const inUTC = time || new Date()

  // Step 2: Apply target timezone (UTC -> zoned)
  const tzOffset = timezone ? getTimezoneOffset(timezone, inUTC) : 0
  const inZone = addMilliseconds(inUTC, tzOffset)

  // Step 3: Move time to 0:00:00
  inZone.setUTCHours(0, 0, 0, 0)

  // Step 4: Revert to UTC (zoned -> UTC)
  return addMilliseconds(inZone, -tzOffset)
}
