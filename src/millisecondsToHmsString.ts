/**
 * Convert milliseconds to a formatted time string in HH:MM:SS format.
 *
 * @param {number} milliseconds - The time in milliseconds to convert
 * @return {string} - Formatted time string in HH:MM:SS format
 */
export function millisecondsToHmsString (milliseconds: number): string {
  // Handle negative values
  if (milliseconds < 0) {
    return '00:00:00'
  }

  // Calculate hours, minutes, and seconds
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Pad with leading zeros and format as HH:MM:SS
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
