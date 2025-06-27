import { expect } from 'chai'
import { formatCalendarDate } from '../dist/index.js'

describe('formatCalendarDate', () => {
  const testDate = new Date('2023-04-15T12:00:00Z')

  it('should format date correctly with default options', () => {
    const result = formatCalendarDate(testDate)
    expect(result).to.equal('2023-04-15')
  })

  it('should format date correctly with locale de-DE', () => {
    const result = formatCalendarDate(testDate, { locale: 'de-DE' })
    expect(result).to.equal('15.4.2023')
  })

  it('should format date correctly with locale en-US', () => {
    const result = formatCalendarDate(testDate, { locale: 'en-US' })
    expect(result).to.equal('4/15/2023')
  })

  it('should format date correctly for America/New_York timezone', () => {
    const result = formatCalendarDate(testDate, { timezone: 'America/New_York' })
    expect(result).to.equal('2023-04-15')
  })

  it('should format date correctly for Asia/Tokyo timezone', () => {
    const result = formatCalendarDate(testDate, { timezone: 'Asia/Tokyo' })
    expect(result).to.equal('2023-04-15')
  })

  it('should format date correctly for Europe/London timezone', () => {
    const result = formatCalendarDate(testDate, { timezone: 'Europe/London' })
    expect(result).to.equal('2023-04-15')
  })

  it('should format date correctly for Europe/Berlin timezone (1)', () => {
    const result = formatCalendarDate(new Date('2024-04-10T21:30:00Z'), { timezone: 'Europe/Berlin' })
    expect(result).to.equal('2024-04-10') // 10th April 2024, 23:30 Berlin time
  })

  it('should format date correctly for Europe/Berlin timezone (2)', () => {
    const result = formatCalendarDate(new Date('2024-04-10T23:00:00Z'), { timezone: 'Europe/Berlin' })
    expect(result).to.equal('2024-04-11') // 11th April 2024, 01:00 Berlin time
  })

  it('should format date correctly for Australia/Sydney timezone (1)', () => {
    const result = formatCalendarDate(new Date('2024-04-11T13:30:00Z'), { timezone: 'Australia/Sydney' })
    expect(result).to.equal('2024-04-11') // 11th April 2024, 23:30 Sydney time
  })

  it('should format date correctly for Australia/Sydney timezone (2)', () => {
    const result = formatCalendarDate(new Date('2024-04-11T14:00:00Z'), { timezone: 'Australia/Sydney' })
    expect(result).to.equal('2024-04-12') // 12th April 2024, 00:00 Sydney time
  })

  it('should handle date correctly around daylight saving time changes', () => {
    const dstDate = new Date('2023-03-12T07:00:00Z') // Just after DST starts in the US
    const result = formatCalendarDate(dstDate, { timezone: 'America/New_York' })
    expect(result).to.equal('2023-03-12')
  })

  it('should format date correctly with both custom locale and timezone', () => {
    const result = formatCalendarDate(testDate, { locale: 'ja-JP', timezone: 'Asia/Tokyo' })
    expect(result).to.equal('2023/4/15')
  })

  it('should format date correctly with custom format string', () => {
    const result = formatCalendarDate(testDate, { format: 'dd/MM/yyyy' })
    expect(result).to.equal('15/04/2023')
  })

  it('should format date correctly with custom format string including time', () => {
    const result = formatCalendarDate(testDate, { format: 'yyyy-MM-dd HH:mm:ss' })
    expect(result).to.equal('2023-04-15 12:00:00')
  })

  it('should format date correctly with custom format string and timezone', () => {
    const result = formatCalendarDate(testDate, { format: 'yyyy-MM-dd HH:mm:ss', timezone: 'America/New_York' })
    expect(result).to.equal('2023-04-15 08:00:00')
  })

  it('should prioritize format over locale when both are provided', () => {
    const result = formatCalendarDate(testDate, { format: 'dd/MM/yyyy', locale: 'de-DE' })
    expect(result).to.equal('15/04/2023')
  })

  it('should use locale formatting when only locale is provided', () => {
    const result = formatCalendarDate(testDate, { locale: 'de-DE' })
    expect(result).to.equal('15.4.2023')
  })

  it('should throw an error for invalid timezone', () => {
    expect(() => formatCalendarDate(testDate, { timezone: 'Invalid/Timezone' })).to.throw()
  })

  it('should throw an error for invalid locale', () => {
    expect(() => formatCalendarDate(testDate, { locale: 'some-invalid-locale' })).to.throw()
  })
})
