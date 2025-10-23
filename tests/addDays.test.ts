
import { addDays } from '../src/index.js'

describe('addDays', () => {
  it('should handle DST transition in Australia/Sydney (Spring Forward)', () => {
    const timezone = 'Australia/Sydney'
    const date = new Date('2023-09-30T14:30:00.000Z') // Sun Oct 01 2023 00:30:00 GMT+1000 (Australian Eastern Standard Time)
    const result = addDays(date, 1, { timezone })
    expect(result).toEqual(new Date('2023-10-01T13:30:00.000Z')) // Mon Oct 02 2023 00:30:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should work correctly with UTC', () => {
    const timezone = 'UTC'
    const date = new Date('2023-05-15T12:00:00.000Z')
    const result = addDays(date, 1, { timezone })
    expect(result).toEqual(new Date('2023-05-16T12:00:00.000Z'))
  })

  it('should work correctly with Europe/Berlin', () => {
    const timezone = 'Europe/Berlin'
    const date = new Date('2023-03-25T23:00:00.000Z') // Mar 26 2023 00:00:00 GMT+0100 (CET)
    const result = addDays(date, 1, { timezone })
    expect(result).toEqual(new Date('2023-03-26T22:00:00.000Z')) // Mar 27 2023 00:00:00 GMT+0200 (CEST) - after DST change
  })

  it('should work correctly with America/Los_Angeles', () => {
    const timezone = 'America/Los_Angeles'
    const date = new Date('2023-11-05T07:00:00.000Z') // Sun Nov 05 2023 01:00:00 GMT-0700 (Pacific Daylight Time)
    const result = addDays(date, 1, { timezone })
    expect(result).toEqual(new Date('2023-11-06T08:00:00.000Z')) // Mon Nov 06 2023 01:00:00 GMT-0800 (Pacific Standard Time)
  })

  it('should work correctly with no timezone specified (default to UTC)', () => {
    const date = new Date('2023-05-15T12:00:00.000Z')
    const result = addDays(date, 1)
    expect(result).toEqual(new Date('2023-05-16T12:00:00.000Z'))
  })

  it('should handle negative day additions', () => {
    const timezone = 'Europe/Berlin'
    const date = new Date('2023-03-26T22:00:00.000Z') // Mar 27 2023 00:00:00 GMT+0200 (CEST)
    const result = addDays(date, -1, { timezone })
    expect(result).toEqual(new Date('2023-03-25T23:00:00.000Z')) // Mar 26 2023 00:00:00 GMT+0100 (CET) - before DST change
  })

  it('should handle large day additions America/Los_Angeles', () => {
    const timezone = 'America/Los_Angeles'
    const date = new Date('2023-01-01T05:00:00.000Z') // Jan 01 2023 00:00:00 GMT-0500 (EST)
    const result = addDays(date, 365, { timezone })
    expect(result).toEqual(new Date('2024-01-01T05:00:00.000Z')) // Jan 01 2024 00:00:00 GMT-0500 (EST)
  })

  it('should throw an error for invalid date input', () => {
    expect(() => addDays('not a date', 1)).toThrow('`date` must be an instance of Date')
  })

  it('should throw an error for invalid amount input', () => {
    expect(() => addDays(new Date(), 'not a number')).toThrow('`amount` must be a number')
  })
})
