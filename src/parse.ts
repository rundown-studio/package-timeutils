import { TimezoneOption } from './types'
import { parse as _parse } from 'date-fns'
import { tz } from '@date-fns/tz'

export function parse (
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
): Date {
  return _parse(dateStr, formatStr, referenceDate, { in: tz(timezone) })
}

// // 2023-03-12T06:30:00.000Z Sun Mar 12 2023 01:30:00 GMT-0500 (Eastern Standard Time)
// const result = parse('2023-03-12 01:30', 'yyyy-MM-dd HH:mm', new Date(), { in: tz('America/New_York') })
// expect(result).to.deep.equal(new Date('2023-03-12T06:30:00.000Z')) // ✅

// // 2023-03-12T08:00:00.000Z Sun Mar 12 2023 04:00:00 GMT-0400 (Eastern Daylight Time)
// const result = parse('2023-03-12 04:00', 'yyyy-MM-dd HH:mm', new Date(), { in: tz('America/New_York') })
// expect(result).to.deep.equal(new Date('2023-03-12T08:00:00.000Z')) // ⛔️
// // Expected value to strictly be equal to:
// //   2023-03-12T08:00:00.000Z
// // Received:
// //   2023-03-12T09:00:00.000Z

// // 2023-03-12T08:00:00.000Z Sun Mar 12 2023 04:00:00 GMT-0400 (Eastern Daylight Time)
// const result = parse('2023-03-13 04:00', 'yyyy-MM-dd HH:mm', new Date(), { in: tz('America/New_York') })
// expect(result).to.deep.equal(new Date('2023-03-13T08:00:00.000Z')) // ✅
