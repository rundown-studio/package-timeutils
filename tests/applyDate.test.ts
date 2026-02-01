
import { applyDate } from '../src/index.js'

describe('applyDate', () => {
  it('should throw an error for invalid time parameter', () => {
    expect(() => applyDate(true)).toThrow('`time` must be an instance of Date')
    expect(() => applyDate(false)).toThrow('`time` must be an instance of Date')
    expect(() => applyDate(null)).toThrow('`time` must be an instance of Date')
    expect(() => applyDate(undefined)).toThrow('`time` must be an instance of Date')
    expect(() => applyDate('a')).toThrow('`time` must be an instance of Date')
  })

  it('should throw an error for invalid date parameter', () => {
    const now = new Date()
    expect(() => applyDate(now, true)).toThrow('`date` must be an instance of Date')
    expect(() => applyDate(now, false)).toThrow('`date` must be an instance of Date')
    expect(() => applyDate(now, null)).toThrow('`date` must be an instance of Date')
    expect(() => applyDate(now, undefined)).toThrow('`date` must be an instance of Date')
    expect(() => applyDate(now, 'a')).toThrow('`date` must be an instance of Date')
  })

  it('should return a correct date for valid inputs', () => {
    const now = new Date()
    expect(applyDate(now, now)).toEqual(now)
  })

  it('should handle US DST change March 12 (w/o timezone)', () => {
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle US DST change March 12 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle US DST change March 12 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 16:10:00 GMT+0100 (Central European Standard Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 04:33:33 GMT+0100 (Central European Standard Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-14T15:10:00.000Z')) // Tue Mar 14 2023 16:10:00 GMT+0100 (Central European Standard Time)
  })

  it('should handle US DST change March 12 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sat Mar 11 2023 07:10:00 GMT-0800 (Pacific Standard Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Mon Mar 13 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-13T14:10:00.000Z')) // Mon Mar 13 2023 07:10:00 GMT-0700 (Pacific Daylight Time)
  })

  it('should handle US DST change March 12 (Australia/Sydney)', () => {
    const timezone = 'Australia/Sydney'
    const inTime = new Date('2023-03-11T15:10:00.000Z') // Sun Mar 12 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
    const inDate = new Date('2023-03-14T03:33:33.000Z') // Tue Mar 14 2023 14:33:33 GMT+1100 (Australian Eastern Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-13T15:10:00.000Z')) // Tue Mar 14 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should handle DE DST change March 26 (w/o timezone)', () => {
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2023-03-28T15:10:00.000Z')) // Tue Mar 28 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle DE DST change March 26 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-28T15:10:00.000Z')) // Tue Mar 28 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle DE DST change March 26 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 16:10:00 GMT+0100 (Central European Standard Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 05:33:33 GMT+0200 (Central European Summer Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-28T14:10:00.000Z')) // Tue Mar 28 2023 16:10:00 GMT+0200 (Central European Summer Time)
  })

  it('should handle DE DST change March 26 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Fri Mar 24 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Mon Mar 27 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-27T15:10:00.000Z')) // Mon Mar 27 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
  })

  it('should handle DE DST change March 26 (Australia/Sydney)', () => {
    const timezone = 'Australia/Sydney'
    const inTime = new Date('2023-03-24T15:10:00.000Z') // Sat Mar 25 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
    const inDate = new Date('2023-03-28T03:33:33.000Z') // Tue Mar 28 2023 14:33:33 GMT+1100 (Australian Eastern Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-03-27T15:10:00.000Z')) // Tue Mar 28 2023 02:10:00 GMT+1100 (Australian Eastern Daylight Time)
  })

  it('should handle AU DST change Oct 1 (w/o timezone)', () => {
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle AU DST change Oct 1 (UTC)', () => {
    const timezone = 'UTC'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 03:33:33 GMT+0000 (Coordinated Universal Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 15:10:00 GMT+0000 (Coordinated Universal Time)
  })

  it('should handle AU DST change Oct 1 (Europe/Berlin)', () => {
    const timezone = 'Europe/Berlin'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 17:10:00 GMT+0200 (Central European Summer Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Mon Oct 02 2023 05:33:33 GMT+0200 (Central European Summer Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-10-02T15:10:00.000Z')) // Mon Oct 02 2023 17:10:00 GMT+0200 (Central European Summer Time)
  })

  it('should handle AU DST change Oct 1 (America/Los_Angeles)', () => {
    const timezone = 'America/Los_Angeles'
    const inTime = new Date('2023-09-30T15:10:00.000Z') // Sat Sep 30 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
    const inDate = new Date('2023-10-02T03:33:33.000Z') // Sun Oct 01 2023 20:33:33 GMT-0700 (Pacific Daylight Time)
    const output = applyDate(inTime, inDate, { timezone })
    expect(output).toEqual(new Date('2023-10-01T15:10:00.000Z')) // Sun Oct 01 2023 08:10:00 GMT-0700 (Pacific Daylight Time)
  })

  test('handles DST offset change correctly for dates before and after DST (example 1)', () => {
    const timezone = 'Europe/Berlin'
    const today = new Date('2024-02-03T23:00:00.000Z')

    // Pre DST date
    expect(applyDate(new Date('2023-10-15T21:30:00.000Z'), today, { timezone })).toEqual(new Date('2024-02-04T22:30:00.000Z'))

    // Post DST date
    expect(applyDate(new Date('2023-12-15T21:30:00.000Z'), today, { timezone })).toEqual(new Date('2024-02-04T21:30:00.000Z'))
  })

  test('handles DST offset change correctly for dates before and after DST (example 2)', () => {
    const timezone = 'America/Los_Angeles'
    const today = new Date('2024-02-03T08:00:00.000Z') // Sat Feb 03 2024 00:00:00 GMT-0800 (Pacific Standard Time)

    // Pre DST date
    expect(applyDate(new Date('2023-10-15T21:30:00.000Z'), today, { timezone })).toEqual(new Date('2024-02-03T22:30:00.000Z'))

    // Post DST date
    expect(applyDate(new Date('2023-12-15T21:30:00.000Z'), today, { timezone })).toEqual(new Date('2024-02-03T21:30:00.000Z'))
  })

  test('handles February 27 to November 30 in a leap year', () => {
    const inTime = new Date('2024-02-27T07:04:04.000Z')
    const inDate = new Date('2023-11-30T07:02:02.000Z')
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2023-11-30T07:04:04.000Z'))
  })

  test('Bug: Month overflow - Dec 30 to Feb should not become March', () => {
    // This bug occurred when source day (30) doesn't exist in target month (Feb)
    const inTime = new Date('2025-12-30T10:15:00.000Z') // Dec 30
    const inDate = new Date('2020-02-02T00:00:00.000Z') // Feb 2
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2020-02-02T10:15:00.000Z'))
  })

  test('Bug: Month overflow - Dec 31 to Feb should not become March', () => {
    const inTime = new Date('2025-12-31T10:15:00.000Z') // Dec 31
    const inDate = new Date('2020-02-15T00:00:00.000Z') // Feb 15
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2020-02-15T10:15:00.000Z'))
  })

  test('Bug: Month overflow - Jan 31 to Apr (30 days) should not overflow', () => {
    const inTime = new Date('2025-01-31T10:15:00.000Z') // Jan 31
    const inDate = new Date('2020-04-15T00:00:00.000Z') // Apr 15
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2020-04-15T10:15:00.000Z'))
  })

  test('Bug: Month overflow - Mar 31 to Feb in leap year', () => {
    const inTime = new Date('2025-03-31T10:15:00.000Z') // Mar 31
    const inDate = new Date('2020-02-29T00:00:00.000Z') // Feb 29 (leap year)
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2020-02-29T10:15:00.000Z'))
  })

  // Reported bug: User selects Feb 3 as finish date but field shows 2026-03-03.
  // The finish time was on Jan 31, so applying Feb 3 caused: Jan 31 → set month to Feb → Feb 31 → March 3.
  test('Bug: Reported - Jan 31 finish time, select Feb 3 date (w/o timezone)', () => {
    const inTime = new Date('2026-01-31T10:00:00.000Z')
    const inDate = new Date('2026-02-03T00:00:00.000Z')
    const output = applyDate(inTime, inDate)
    expect(output).toEqual(new Date('2026-02-03T10:00:00.000Z'))
  })

  test('Bug: Reported - Jan 31 finish time, select Feb 3 date (UTC)', () => {
    const inTime = new Date('2026-01-31T10:00:00.000Z')
    const inDate = new Date('2026-02-03T00:00:00.000Z')
    const output = applyDate(inTime, inDate, { timezone: 'UTC' })
    expect(output).toEqual(new Date('2026-02-03T10:00:00.000Z'))
  })

  test('Bug: Reported - Jan 31 finish time, select Feb 3 date (America/Los_Angeles)', () => {
    const inTime = new Date('2026-01-31T18:00:00.000Z') // Jan 31 10:00 PST
    const inDate = new Date('2026-02-03T08:00:00.000Z') // Feb 3 00:00 PST
    const output = applyDate(inTime, inDate, { timezone: 'America/Los_Angeles' })
    expect(output).toEqual(new Date('2026-02-03T18:00:00.000Z')) // Feb 3 10:00 PST
  })

  test('Bug: Reported - Jan 31 finish time, select Feb 3 date (Europe/Berlin)', () => {
    const inTime = new Date('2026-01-31T09:00:00.000Z') // Jan 31 10:00 CET
    const inDate = new Date('2026-02-02T23:00:00.000Z') // Feb 3 00:00 CET
    const output = applyDate(inTime, inDate, { timezone: 'Europe/Berlin' })
    expect(output).toEqual(new Date('2026-02-03T09:00:00.000Z')) // Feb 3 10:00 CET
  })

  test('Bug: Reported - Jan 31 finish time, select Feb 3 date (Australia/Sydney)', () => {
    const inTime = new Date('2026-01-30T23:00:00.000Z') // Jan 31 10:00 AEDT
    const inDate = new Date('2026-02-02T13:00:00.000Z') // Feb 3 00:00 AEDT
    const output = applyDate(inTime, inDate, { timezone: 'Australia/Sydney' })
    expect(output).toEqual(new Date('2026-02-02T23:00:00.000Z')) // Feb 3 10:00 AEDT
  })

  describe('Bug: DST-crossing offset — reusing dateOffset gives wrong UTC result', () => {
    // On 2025-03-30 in Europe/Berlin, clocks jump from 02:00 CET (+1h) to 03:00 CEST (+2h).
    // time is 01:00 CET on March 28 (offset +1h, different day)
    // date is noon CEST on March 30 (offset +2h, after switch)
    // Output should be 01:00 CET on March 30 (before the switch on that day), so offset +1h.
    // If dateOffset (+2h) is reused instead of recalculated, result is 1 hour off.
    test('time on pre-DST day, date on DST-switch day after switch', () => {
      const timezone = 'Europe/Berlin'
      const inTime = new Date('2025-03-28T00:00:00.000Z') // Mar 28 01:00 CET (offset +1h)
      const inDate = new Date('2025-03-30T10:00:00.000Z') // Mar 30 12:00 CEST (offset +2h)
      const output = applyDate(inTime, inDate, { timezone })
      // Output: Mar 30 01:00 CET = 2025-03-30T00:00:00Z (offset +1h, before DST switch)
      expect(output).toEqual(new Date('2025-03-30T00:00:00.000Z'))
    })
  })

  describe('Month overflow: last day of long month → shorter month', () => {
    test('Jan 31 → Feb 1 (no tz)', () => {
      const output = applyDate(new Date('2026-01-31T10:00:00.000Z'), new Date('2026-02-01T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-01T10:00:00.000Z'))
    })

    test('Jan 31 → Feb 15 (no tz)', () => {
      const output = applyDate(new Date('2026-01-31T10:00:00.000Z'), new Date('2026-02-15T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-15T10:00:00.000Z'))
    })

    test('Jan 31 → Feb 28 (no tz)', () => {
      const output = applyDate(new Date('2026-01-31T10:00:00.000Z'), new Date('2026-02-28T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-28T10:00:00.000Z'))
    })

    test('Jan 30 → Feb 28 (no tz)', () => {
      const output = applyDate(new Date('2026-01-30T10:00:00.000Z'), new Date('2026-02-28T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-28T10:00:00.000Z'))
    })

    test('Jan 29 → Feb 28 (no tz)', () => {
      const output = applyDate(new Date('2026-01-29T10:00:00.000Z'), new Date('2026-02-28T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-28T10:00:00.000Z'))
    })

    test('Mar 31 → Feb 28 (no tz)', () => {
      const output = applyDate(new Date('2026-03-31T10:00:00.000Z'), new Date('2026-02-28T00:00:00.000Z'))
      expect(output).toEqual(new Date('2026-02-28T10:00:00.000Z'))
    })

    test('Jan 31 → Feb 1 (Europe/Berlin)', () => {
      const inTime = new Date('2026-01-31T09:00:00.000Z') // Jan 31 10:00 CET
      const inDate = new Date('2026-01-31T23:00:00.000Z') // Feb 1 00:00 CET
      const output = applyDate(inTime, inDate, { timezone: 'Europe/Berlin' })
      expect(output).toEqual(new Date('2026-02-01T09:00:00.000Z')) // Feb 1 10:00 CET
    })

    test('Jan 31 → Feb 28 (Europe/Berlin)', () => {
      const inTime = new Date('2026-01-31T09:00:00.000Z') // Jan 31 10:00 CET
      const inDate = new Date('2026-02-27T23:00:00.000Z') // Feb 28 00:00 CET
      const output = applyDate(inTime, inDate, { timezone: 'Europe/Berlin' })
      expect(output).toEqual(new Date('2026-02-28T09:00:00.000Z')) // Feb 28 10:00 CET
    })

    test('Jan 31 → Feb 1 (America/Los_Angeles)', () => {
      const inTime = new Date('2026-01-31T18:00:00.000Z') // Jan 31 10:00 PST
      const inDate = new Date('2026-02-01T08:00:00.000Z') // Feb 1 00:00 PST
      const output = applyDate(inTime, inDate, { timezone: 'America/Los_Angeles' })
      expect(output).toEqual(new Date('2026-02-01T18:00:00.000Z')) // Feb 1 10:00 PST
    })

    test('Jan 31 → Feb 28 (America/Los_Angeles)', () => {
      const inTime = new Date('2026-01-31T18:00:00.000Z') // Jan 31 10:00 PST
      const inDate = new Date('2026-02-28T08:00:00.000Z') // Feb 28 00:00 PST
      const output = applyDate(inTime, inDate, { timezone: 'America/Los_Angeles' })
      expect(output).toEqual(new Date('2026-02-28T18:00:00.000Z')) // Feb 28 10:00 PST
    })

    test('Jan 31 → Feb 2 (Australia/Sydney)', () => {
      const inTime = new Date('2026-01-30T23:00:00.000Z') // Jan 31 10:00 AEDT
      const inDate = new Date('2026-02-01T13:00:00.000Z') // Feb 2 00:00 AEDT
      const output = applyDate(inTime, inDate, { timezone: 'Australia/Sydney' })
      expect(output).toEqual(new Date('2026-02-01T23:00:00.000Z')) // Feb 2 10:00 AEDT
    })

    test('Jan 31 → Feb 28 (Australia/Sydney)', () => {
      const inTime = new Date('2026-01-30T23:00:00.000Z') // Jan 31 10:00 AEDT
      const inDate = new Date('2026-02-27T13:00:00.000Z') // Feb 28 00:00 AEDT
      const output = applyDate(inTime, inDate, { timezone: 'Australia/Sydney' })
      expect(output).toEqual(new Date('2026-02-27T23:00:00.000Z')) // Feb 28 10:00 AEDT
    })
  })

  describe('Bug found on Feb 21 while testing rundown date input', () => {
    test('Feb 19 to Feb 19, Europe/Berlin, reference case', () => {
      const timezone = 'Europe/Berlin'
      const inTime = new Date('2025-02-19T08:00:00.000Z') // Wed Feb 19 2025 09:00:00 GMT+0100 (Central European Standard Time)
      const inDate = new Date('2025-02-18T23:00:00.000Z') // Wed Feb 19 2025 00:00:00 GMT+0100 (Central European Standard Time)
      const output = applyDate(inTime, inDate, { timezone })
      expect(output).toEqual(new Date('2025-02-19T08:00:00.000Z')) // Wed Feb 19 2025 09:00:00 GMT+0100 (Central European Standard Time)
    })

    test('Feb 20 to Feb 19, Europe/Berlin, error case', () => {
      const timezone = 'Europe/Berlin'
      const inTime = new Date('2025-02-19T08:00:00.000Z') // Wed Feb 19 2025 09:00:00 GMT+0100 (Central European Standard Time)
      const inDate = new Date('2025-02-19T23:00:00.000Z') // Thu Feb 20 2025 00:00:00 GMT+0100 (Central European Standard Time)
      const output = applyDate(inTime, inDate, { timezone })
      expect(output).toEqual(new Date('2025-02-20T08:00:00.000Z')) // Thu Feb 20 2025 09:00:00 GMT+0100 (Central European Standard Time)
    })

    test('Feb 21 to Feb 19, Europe/Berlin, reference case', () => {
      const timezone = 'Europe/Berlin'
      const inTime = new Date('2025-02-19T08:00:00.000Z') // Wed Feb 19 2025 09:00:00 GMT+0100 (Central European Standard Time)
      const inDate = new Date('2025-02-20T23:00:00.000Z') // Fri Feb 21 2025 00:00:00 GMT+0100 (Central European Standard Time)
      const output = applyDate(inTime, inDate, { timezone })
      expect(output).toEqual(new Date('2025-02-21T08:00:00.000Z')) // Fri Feb 21 2025 09:00:00 GMT+0100 (Central European Standard Time)
    })
  })
})
