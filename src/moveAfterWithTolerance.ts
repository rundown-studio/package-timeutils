import { moveAfter } from './moveAfter'
import { addMilliseconds } from 'date-fns'
import { TimezoneOption } from './types'

/**
 * Move the 'time' date so that it preserves the time of day but is after the 'after' date.
 * However, the time can be within the tolerance even if it's technically before 'after'.
 *
 * @param  {Date}   time
 * @param  {Date}   after
 * @param  {string} [timezone]
 * @param  {number} [tolerance]
 * @return {Date}
 */
export function moveAfterWithTolerance (
  time: Date,
  after: Date,
  tolerance: number = 60 * 60 * 1000, // 60 minutes
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
): Date {
  if (isNaN(tolerance)) throw new Error('`tolerance` must be a valid number')
  const adjustedAfter = addMilliseconds(after, -tolerance)

  // Don't move time if they are identical with 0 tollerance
  if (tolerance === 0 && time.getTime() === adjustedAfter.getTime()) return time

  return moveAfter(time, adjustedAfter, { timezone })
}
