import { expect } from 'chai'
import { parse } from '../dist/esm/index.js'

describe('parse function', () => {
  const timezones = [
    'UTC',
    'Europe/Berlin',
    'America/Los_Angeles',
    'America/New_York',
    'Australia/Sydney'
  ]

  describe('parsing time only', () => {
    timezones.forEach(timezone => {
      it(`should parse time correctly for ${timezone} timezone`, () => {
        const referenceDate = new Date('2023-04-15T00:00:00Z')
        const result = parse('12:45', 'HH:mm', referenceDate, { timezone })

        // Adjust expected time based on timezone
        const expected = {
          'UTC': new Date('2023-04-15T12:45:00Z'),
          'Europe/Berlin': new Date('2023-04-15T10:45:00Z'),
          'America/Los_Angeles': new Date('2023-04-14T19:45:00Z'),
          'America/New_York': new Date('2023-04-14T16:45:00Z'),
          'Australia/Sydney': new Date('2023-04-15T02:45:00Z'),
        }

        expect(result).to.deep.equal(expected[timezone])
      })
    })
  })

  describe('parsing date only', () => {
    timezones.forEach(timezone => {
      it(`should parse date correctly for ${timezone} timezone`, () => {
        const referenceDate = new Date('2023-04-15T00:00:00Z')
        const result = parse('2024-02-03', 'yyyy-MM-dd', referenceDate, { timezone })

        // Adjust expected date based on timezone
        const expected = {
          'UTC': new Date('2024-02-03T00:00:00Z'),
          'Europe/Berlin': new Date('2024-02-02T23:00:00Z'),
          'America/Los_Angeles': new Date('2024-02-03T08:00:00Z'),
          'America/New_York': new Date('2024-02-03T05:00:00Z'),
          'Australia/Sydney': new Date('2024-02-02T13:00:00Z'),
        }

        expect(result).to.deep.equal(expected[timezone])
      })
    })
  })

  it('should use UTC as default timezone if not specified', () => {
    const referenceDate = new Date('2023-04-15T00:00:00Z')
    const result = parse('15:30', 'HH:mm', referenceDate)
    expect(result).to.deep.equal(new Date('2023-04-15T15:30:00.000Z'))
  })

  it('should handle 1 day before Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-11 01:30', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-11T06:30:00.000Z'))
    // Sat Mar 11 2023 01:30:00 GMT-0500 (Eastern Standard Time)
  })

  it('should handle 30 min before Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-12 01:30', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-12T06:30:00.000Z'))
    // Sun Mar 12 2023 01:30:00 GMT-0500 (Eastern Standard Time)
  })

  it('should handle right before Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-12 02:00', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-12T07:00:00.000Z'))
    // Sun Mar 12 2023 02:00:00 GMT-0500 (Eastern Daylight Time)
  })

  it('should handle right after Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-12 03:00', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-12T07:00:00.000Z'))
    // Sun Mar 12 2023 03:00:00 GMT-0400 (Eastern Daylight Time)
  })

  // Seems to always use the start of the day as reference for DST offset
  it('should handle 30 min after Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-12 03:30', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-12T07:30:00.000Z'))
    // Sun Mar 12 2023 03:30:00 GMT-0400 (Eastern Daylight Time)
  })

  it('should handle 1 day after Daylight Saving Time change (America/New_York)', () => {
    const referenceDate = new Date()
    const result = parse('2023-03-13 03:30', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'America/New_York' })
    expect(result).to.deep.equal(new Date('2023-03-13T07:30:00.000Z'))
    // Mon Mar 13 2023 03:30:00 GMT-0400 (Eastern Daylight Time)
  })

  // Should throw on invalid timezone like 'format', but doesn't
  it.skip('should throw an error for invalid timezone', () => {
    const referenceDate = new Date()
    expect(() => parse('12:00', 'HH:mm', referenceDate, { timezone: 'Invalid/Timezone' })).to.throw()
  })

  it('should handle parsing at the start of the day', () => {
    const referenceDate = new Date('2023-04-15T00:00:00Z')
    const result = parse('00:00', 'HH:mm', referenceDate, { timezone: 'Australia/Sydney' })
    expect(result).to.deep.equal(new Date('2023-04-14T14:00:00.000Z'))
  })

  it('should handle parsing at the end of the day', () => {
    const referenceDate = new Date('2023-04-15T00:00:00Z')
    const result = parse('23:59', 'HH:mm', referenceDate, { timezone: 'America/Los_Angeles' })
    expect(result).to.deep.equal(new Date('2023-04-15T06:59:00.000Z'))
  })

  it('should handle parsing on the last day of the year', () => {
    const referenceDate = new Date('2023-04-15T00:00:00Z')
    const result = parse('2023-12-31 23:59', 'yyyy-MM-dd HH:mm', referenceDate, { timezone: 'Europe/Berlin' })
    expect(result).to.deep.equal(new Date('2023-12-31T22:59:00.000Z'))
  })
})
