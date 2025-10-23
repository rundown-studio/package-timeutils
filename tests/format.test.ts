
import { format } from '../src/index.js'

describe('format function', () => {
  const formatString = 'HH:mm:ss yyyy-MM-dd'

  const timezones = [
    'UTC',
    'Europe/Berlin',
    'America/Los_Angeles',
    'America/New_York',
    'Australia/Sydney'
  ]

  timezones.forEach(timezone => {
    it(`should format date correctly for ${timezone} timezone`, () => {
      const testDate = new Date('2023-04-15T12:30:45Z')
      const result = format(testDate, formatString, { timezone })

      // Expected results for each timezone
      const expected = {
        'UTC': '12:30:45 2023-04-15',
        'Europe/Berlin': '14:30:45 2023-04-15',
        'America/Los_Angeles': '05:30:45 2023-04-15',
        'America/New_York': '08:30:45 2023-04-15',
        'Australia/Sydney': '22:30:45 2023-04-15'
      }

      expect(result).toBe(expected[timezone])
    })
  })

  it('should use UTC as default timezone if not specified', () => {
    const testDate = new Date('2023-04-15T12:30:45Z')
    const result = format(testDate, formatString)
    expect(result).toBe('12:30:45 2023-04-15')
  })

  it('should handle dates around Daylight Saving Time changes', () => {
    const dstDate = new Date('2023-03-12T10:00:00Z') // Just after DST starts in the US
    const result = format(dstDate, formatString, { timezone: 'America/New_York' })
    expect(result).toBe('06:00:00 2023-03-12')
  })

  it('should throw an error for invalid timezone', () => {
    expect(() => format(new Date(), formatString, { timezone: 'Invalid/Timezone' })).toThrow()
  })

  it('should handle dates at the start of the day', () => {
    const startOfDay = new Date('2023-04-15T00:00:00Z')
    const result = format(startOfDay, formatString, { timezone: 'Australia/Sydney' })
    expect(result).toBe('10:00:00 2023-04-15')
  })

  it('should handle dates at the end of the day', () => {
    const endOfDay = new Date('2023-04-15T23:59:59Z')
    const result = format(endOfDay, formatString, { timezone: 'America/Los_Angeles' })
    expect(result).toBe('16:59:59 2023-04-15')
  })

  it('should handle dates on the last day of the year', () => {
    const lastDayOfYear = new Date('2023-12-31T23:59:59Z')
    const result = format(lastDayOfYear, formatString, { timezone: 'Europe/Berlin' })
    expect(result).toBe('00:59:59 2024-01-01')
  })
})
