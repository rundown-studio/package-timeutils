import { HmsTouple } from './types'

/**
 * Converts milliseconds to an object containing hours, minutes, seconds, and decimals.
 *
 * @param {number} ms - The time in milliseconds.
 * @return {HmsTouple} An object containing hours, minutes, seconds, and decimals.
 */
export function millisecondsToHms (ms: number = 0): HmsTouple {
  return {
    hours: Math.floor(ms / 3600000) || 0,
    minutes: Math.floor((ms % 3600000) / 60000) || 0,
    seconds: Math.floor((ms % 60000) / 1000) || 0,
    decimals: Math.floor((ms % 1000) / 100) || 0,
  }
}
