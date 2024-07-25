import { HmsTouple } from './types'

/**
 * Converts an object with hours, minutes, seconds, and optional decimals to milliseconds.
 *
 * @param {HmsTouple} hms - An object containing hours, minutes, seconds, and optional decimals.
 * @param {number} hms.hours - The number of hours.
 * @param {number} hms.minutes - The number of minutes.
 * @param {number} hms.seconds - The number of seconds.
 * @param {number} [hms.decimals] - The optional number of tenths of a second.
 * @return {number} The total time in milliseconds.
 */
export function hmsToMilliseconds ({
  hours,
  minutes,
  seconds,
  decimals = 0,
}: HmsTouple): number {
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + (decimals * 100)
}
