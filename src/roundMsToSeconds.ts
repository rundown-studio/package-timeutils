/**
 * Rounds milliseconds to the nearest second boundary.
 *
 * By default uses Math.ceil to round up, which gives the desired behavior for
 * countdowns and durations:
 * - [1ms, 1000ms] → rounds to 1000ms (displays as "1s")
 * - [0ms, -999ms] → rounds to 0ms (displays as "0s")
 * - [-1000ms, -1999ms] → rounds to -1000ms (displays as "+1s" overtime)
 *
 * @param {number} ms - The time in milliseconds.
 * @param {Function} roundingFn - The rounding function to use (default: Math.ceil).
 * @return {number} The rounded time in milliseconds.
 *
 * @example
 * roundMsToSeconds(1500) // 2000 (rounds up to 2s)
 * roundMsToSeconds(500) // 1000 (rounds up to 1s)
 * roundMsToSeconds(-500) // 0 (rounds up to 0s)
 * roundMsToSeconds(-1500) // -1000 (rounds up to -1s)
 * roundMsToSeconds(1500, Math.floor) // 1000 (rounds down to 1s)
 */
export function roundMsToSeconds (ms: number, roundingFn: (n: number) => number = Math.ceil): number {
  return roundingFn(ms / 1000) * 1000
}
