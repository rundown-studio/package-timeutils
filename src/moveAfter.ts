import { applyDate } from './applyDate'
import { addDays } from './addDays'

type MoveTimeOptions = {
  timezone?: string
}

/**
 * Move the 'time' date so that it preserves the time of day but is after the 'after' date.
 * If 'time' is already after 'after', it remains unchanged.
 *
 * @param  {Date}   time
 * @param  {Date}   after
 * @param  {string} [options.timezone]
 * @return {Date}
 */
export function moveAfter (
  time: Date,
  after: Date,
  {
    timezone,
  }: MoveTimeOptions = {},
): Date {
  // If time is already after 'after', return it unchanged
  if (time > after) return time

  // Apply the date from 'after' to 'time'
  let result = applyDate(time, after, { timezone })

  // If the result is still not after 'after', add one day
  if (result <= after) {
    result = addDays(result, 1, { timezone })
  }

  return result
}
