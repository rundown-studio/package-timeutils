import { expect } from 'chai'
import { moveAfterWithTolerance } from '../dist/index.js'

describe('moveAfterWithTolerance', () => {
  it('should throw an error if input is not a Date object', () => {
    expect(() => moveAfter('not a date', new Date())).to.throw()
    expect(() => moveAfter(new Date(), 'not a date')).to.throw()
    expect(() => moveAfter(new Date(), new Date(), 'not a number')).to.throw()
    expect(() => moveAfter(new Date(), new Date(), NaN)).to.throw()
  })

  it('should return the same time when it is already after the "after" date', () => {
    const time = new Date('2023-05-15T10:00:00Z')
    const after = new Date('2023-05-15T09:00:00Z')
    const result = moveAfterWithTolerance(time, after)
    expect(result).to.deep.equal(time)
  })

  it('should move the time to the same day when possible', () => {
    const time = new Date('2023-05-13T11:00:00Z')
    const after = new Date('2023-05-15T09:00:00Z')
    const result = moveAfterWithTolerance(time, after)
    expect(result).to.deep.equal(new Date('2023-05-15T11:00:00Z'))
  })

  it('should move the time to the next day when outside 1h tolerance', () => {
    const tolerance = 60 * 60 * 1000 // 1 hour
    const time = new Date('2023-05-15T20:50:00Z')
    const after = new Date('2023-05-15T22:00:00Z')
    const result = moveAfterWithTolerance(time, after, tolerance)
    expect(result).to.deep.equal(new Date('2023-05-16T20:50:00Z'))
  })

  it('should return the same time when within 1h tolerance', () => {
    const tolerance = 60 * 60 * 1000 // 1 hour
    const time = new Date('2023-05-15T21:10:00Z')
    const after = new Date('2023-05-15T22:00:00Z')
    const result = moveAfterWithTolerance(time, after, tolerance)
    expect(result).to.deep.equal(new Date('2023-05-15T21:10:00Z'))
  })

  it('should handle dates at midnight correctly', () => {
    const time = new Date('2023-05-15T00:00:00Z')
    const after = new Date('2023-05-15T23:59:59Z')
    const result = moveAfterWithTolerance(time, after)
    expect(result).to.deep.equal(new Date('2023-05-16T00:00:00Z'))
  })

  it('should handle dates across year boundaries', () => {
    const time = new Date('2023-12-31T23:00:00Z')
    const after = new Date('2024-01-01T00:30:00Z')
    const result = moveAfterWithTolerance(time, after)
    expect(result).to.deep.equal(new Date('2024-01-01T23:00:00Z'))
  })

  it('should handle leap years correctly', () => {
    const time = new Date('2024-02-29T12:00:00Z')
    const after = new Date('2025-02-28T23:59:59Z')
    const result = moveAfterWithTolerance(time, after)
    expect(result).to.deep.equal(new Date('2025-03-01T12:00:00Z'))
  })

  it('should handle daylight saving time transitions (America/New_York)', () => {
    const timezone = 'America/New_York'
    const time = new Date('2023-03-12T01:30:00-05:00')  // Just before DST starts
    const after = new Date('2023-03-12T03:30:00-04:00') // After DST started
    const result = moveAfterWithTolerance(time, after, 60 * 60 * 1000, { timezone })
    expect(result).to.deep.equal(new Date('2023-03-13T01:30:00-04:00'))
  })

  it('should handle very large tolerance values', () => {
    const time = new Date('2023-05-15T12:00:00Z')
    const after = new Date('2023-05-20T12:00:00Z')
    const largeTolerance = 7 * 24 * 60 * 60 * 1000 // 7 days
    const result = moveAfterWithTolerance(time, after, largeTolerance)
    expect(result).to.deep.equal(new Date('2023-05-15T12:00:00Z'))
  })

  it('should handle very small tolerance values, 1ms more', () => {
    const time = new Date('2023-05-15T11:59:59.999Z')
    const after = new Date('2023-05-15T12:00:00.000Z')
    const smallTolerance = 2 // 2 millisecond
    const result = moveAfterWithTolerance(time, after, smallTolerance)
    expect(result).to.deep.equal(new Date('2023-05-15T11:59:59.999Z'))
  })

  it('should handle very small tolerance, exact match', () => {
    const time = new Date('2023-05-15T11:59:59.999Z')
    const after = new Date('2023-05-15T12:00:00.000Z')
    const smallTolerance = 1 // 1 milliseconds
    const result = moveAfterWithTolerance(time, after, smallTolerance)
    expect(result).to.deep.equal(new Date('2023-05-16T11:59:59.999Z'))
  })

  it('should handle zero tolerance', () => {
    const time = new Date('2023-05-15T11:59:59.999Z')
    const after = new Date('2023-05-15T12:00:00.000Z')
    const zeroTolerance = 0
    const result = moveAfterWithTolerance(time, after, zeroTolerance)
    expect(result).to.deep.equal(new Date('2023-05-16T11:59:59.999Z'))
  })

    it('should not move identical times with zero tolerance', () => {
    const time = new Date('2023-05-15T12:00:00.000Z')
    const after = new Date('2023-05-15T12:00:00.000Z')
    const zeroTolerance = 0
    const result = moveAfterWithTolerance(time, after, zeroTolerance)
    expect(result).to.deep.equal(new Date('2023-05-15T12:00:00.000Z'))
  })

  it('should handle negative tolerance', () => {
    const time = new Date('2023-05-15T12:30:00Z')
    const after = new Date('2023-05-15T12:00:00Z')
    const negativeTolerance = -60 * 60 * 1000 // -1 hour
    const result = moveAfterWithTolerance(time, after, negativeTolerance)
    expect(result).to.deep.equal(new Date('2023-05-16T12:30:00Z'))
  })

  it('should handle Europe/Berlin DST start, inside tolerance', () => {
    const timezone = 'Europe/Berlin'
    const tolerance = 90 * 60 * 1000 // 90 min
    const time = new Date('2024-03-31T00:30:00Z')  // Sun Mar 31 2024 01:30:00 GMT+0100 (Central European Standard Time)
    const after = new Date('2024-03-31T01:30:00Z') // Sun Mar 31 2024 03:30:00 GMT+0200 (Central European Summer Time)
    const result = moveAfterWithTolerance(time, after, tolerance, { timezone })
    expect(result).to.deep.equal(new Date('2024-03-31T00:30:00Z')) // Sun Mar 31 2024 01:30:00 GMT+0100 (Central European Standard Time)
  })

  it('should handle Europe/Berlin DST end, outside tolerance', () => {
    const timezone = 'Europe/Berlin'
    const tolerance = 90 * 60 * 1000 // 90 min
    const time = new Date('2023-10-29T00:30:00Z')  // Sun Oct 29 2023 02:30:00 GMT+0200 (Central European Summer Time)
    const after = new Date('2023-10-29T02:30:00Z') // Sun Oct 29 2023 03:30:00 GMT+0100 (Central European Standard Time)
    const result = moveAfterWithTolerance(time, after, tolerance, { timezone })
    expect(result).to.deep.equal(new Date('2023-10-30T01:30:00Z')) // Mon Oct 30 2023 02:30:00 GMT+0100 (Central European Standard Time)
  })

  it('should handle Australia/Sydney DST start, outside tolerance', () => {
    const timezone = 'Australia/Sydney'
    const tolerance = 90 * 60 * 1000 // 90 min
    const time = new Date('2023-09-30T15:30:00Z')  // Sun Oct 01 2023 01:30:00 GMT+1000 (Australian Eastern Standard Time)
    const after = new Date('2023-09-30T18:30:00Z') // Sun Oct 01 2023 05:30:00 GMT+1100 (Australian Eastern Daylight Time)
    const result = moveAfterWithTolerance(time, after, tolerance, { timezone })
    expect(result).to.deep.equal(new Date('2023-10-01T14:30:00Z')) // Mon Oct 02 2023 01:30:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should handle Australia/Sydney DST end, inside tolerance', () => {
    const timezone = 'Australia/Sydney'
    const tolerance = 90 * 60 * 1000 // 90 min
    const time = new Date('2024-04-06T15:30:00Z')  // Sun Apr 07 2024 02:30:00 GMT+1100 (Australian Eastern Daylight Time)
    const after = new Date('2024-04-06T16:30:00Z') // Sun Apr 07 2024 02:30:00 GMT+1000 (Australian Eastern Standard Time)
    const result = moveAfterWithTolerance(time, after, tolerance, { timezone })
    expect(result).to.deep.equal(new Date('2024-04-06T15:30:00Z')) // Sun Apr 07 2024 02:30:00 GMT+1100 (Australian Eastern Daylight Time)
  })
})
