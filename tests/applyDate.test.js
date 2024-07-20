import { expect } from 'chai'
import { applyDate } from '../dist/esm/index.js'

describe('applyDate', () => {
  it('should throw an error for invalid time parameter', () => {
    expect(() => applyDate(true)).to.throw('`time` must be an instance of Date')
    expect(() => applyDate(false)).to.throw('`time` must be an instance of Date')
    expect(() => applyDate(null)).to.throw('`time` must be an instance of Date')
    expect(() => applyDate(undefined)).to.throw('`time` must be an instance of Date')
    expect(() => applyDate('a')).to.throw('`time` must be an instance of Date')
  })

  it('should throw an error for invalid date parameter', () => {
    const now = new Date()
    expect(() => applyDate(now, true)).to.throw('`date` must be an instance of Date')
    expect(() => applyDate(now, false)).to.throw('`date` must be an instance of Date')
    expect(() => applyDate(now, null)).to.throw('`date` must be an instance of Date')
    expect(() => applyDate(now, undefined)).to.throw('`date` must be an instance of Date')
    expect(() => applyDate(now, 'a')).to.throw('`date` must be an instance of Date')
  })

  it('should return a correct date for valid inputs', () => {
    const now = new Date()
    expect(applyDate(now, now)).to.deep.equal(now)
  })

  it('should handle US DST change March 12 (w/o timezone)', () => {
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).to.deep.equal(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle US DST change March 12 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle US DST change March 12 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 16:10:00 GMT+0100 (Central European Standard Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 04:33:33 GMT+0100 (Central European Standard Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 16:10:00 GMT+0100 (Central European Standard Time)
  })

  it('should handle US DST change March 12 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 07:10:00 GMT-0800 (Pacific Standard Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Mon Mar 13 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-13T14:10:00.000Z')) // Mon Mar 13 2023 07:10:00 GMT-0700 (Pacific Daylight Time)
  })

  it('should handle US DST change March 12 (Australia/Sydney)', () => {
    const timezone = 'Australia/Sydney'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sun Mar 12 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 14:33:33 GMT+1100 (Australian Eastern Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-13T15:10:00.000Z')) // Tue Mar 14 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should handle DE DST change March 26 (w/o timezone)', () => {
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).to.deep.equal(new Date('2023-03-28T15:10:00.000Z')) // Tue Mar 28 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle DE DST change March 26 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-28T15:10:00.000Z')) // Tue Mar 28 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle DE DST change March 26 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 16:10:00 GMT+0100 (Central European Standard Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 05:33:33 GMT+0200 (Central European Summer Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-28T14:10:00.000Z')) // Tue Mar 28 2023 16:10:00 GMT+0200 (Central European Summer Time)
  })

  it('should handle DE DST change March 26 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Mon Mar 27 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-27T15:10:00.000Z')) // Mon Mar 27 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
  })

  it('should handle DE DST change March 26 (Australia/Sydney)', () => {
    const timezone = 'Australia/Sydney'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Sat Mar 25 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 14:33:33 GMT+1100 (Australian Eastern Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-03-27T15:10:00.000Z')) // Tue Mar 28 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should handle AU DST change Oct 1 (w/o timezone)', () => {
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).to.deep.equal(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle AU DST change Oct 1 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle AU DST change Oct 1 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 17:10:00 GMT+0200 (Central European Summer Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 05:33:33 GMT+0200 (Central European Summer Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 17:10:00 GMT+0200 (Central European Summer Time)
  })

  it('should handle AU DST change Oct 1 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Sun Oct 01 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).to.deep.equal(new Date('2023-10-01T15:10:00.000Z')) // Sun Oct 01 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
  })

  test('handles DST offset change correctly for dates before and after DST (example 1)', () => {
    const timezone = 'Europe/Berlin'
    const today = new Date('2024-02-03T23:00:00.000Z')

    // Pre DST date
    expect(applyDate(new Date('2023-10-15T21:30:00.000Z'), today, { timezone })).to.deep.equal(new Date('2024-02-04T22:30:00.000Z'))

    // Post DST date
    expect(applyDate(new Date('2023-12-15T21:30:00.000Z'), today, { timezone })).to.deep.equal(new Date('2024-02-04T21:30:00.000Z'))
  })

  test('handles DST offset change correctly for dates before and after DST (example 2)', () => {
    const timezone = 'America/Los_Angeles'
    const today = new Date('2024-02-03T08:00:00.000Z') // Sat Feb 03 2024 00:00:00 GMT-0800 (Pacific Standard Time)

    // Pre DST date
    expect(applyDate(new Date('2023-10-15T21:30:00.000Z'), today, { timezone })).to.deep.equal(new Date('2024-02-03T22:30:00.000Z'))

    // Post DST date
    expect(applyDate(new Date('2023-12-15T21:30:00.000Z'), today, { timezone })).to.deep.equal(new Date('2024-02-03T21:30:00.000Z'))
  })

  test('handles February 27 to November 30 in a leap year', () => {
    const inTime = new Date('2024-02-27T07:04:04.000Z')
    const inDate = new Date('2023-11-30T07:02:02.000Z')
    const output = applyDate(inTime, inDate)
    expect(output).to.deep.equal(new Date('2023-11-30T07:04:04.000Z'))
  })
})
