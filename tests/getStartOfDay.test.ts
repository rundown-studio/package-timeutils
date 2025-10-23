
import { getStartOfDay } from '../src/index.js'

describe('getStartOfDay', () => {
  test('invalid arguments', () => {
    expect(() => getStartOfDay('a')).toThrow()
    expect(() => getStartOfDay(123)).toThrow()
    expect(() => getStartOfDay(NaN)).toThrow()
    expect(() => getStartOfDay(null)).toThrow()
    expect(() => getStartOfDay({})).toThrow()
    expect(() => getStartOfDay([])).toThrow()
  })

  test('valid arguments', () => {
    expect(getStartOfDay(undefined)).to.be.an.instanceof(Date)
    expect(getStartOfDay()).to.be.an.instanceof(Date)
    expect(getStartOfDay(new Date())).to.be.an.instanceof(Date)
  })

  test('default timezone', () => {
    const today = getStartOfDay(new Date('2023-12-16T12:44:43.252Z'))
    expect(today.toISOString()).toBe('2023-12-16T00:00:00.000Z')
  })

  test('UTC', () => {
    const timezone = 'UTC'

    // Mon Oct 02 2023 23:30:00 GMT+0200 (UTC)
    const today1 = getStartOfDay(new Date('2023-10-02T23:30:00.000Z'), { timezone })
    expect(today1.toISOString()).toBe('2023-10-02T00:00:00.000Z')

    // Tue Oct 03 2023 01:30:00 GMT+0000 (UTC)
    const today2 = getStartOfDay(new Date('2023-10-03T01:30:00.000Z'), { timezone })
    expect(today2.toISOString()).toBe('2023-10-03T00:00:00.000Z')

    // Tue Apr 16 2024 15:01:22 GMT+0000 (UTC)
    const today3 = getStartOfDay(new Date('2024-04-16T15:01:22.871Z'), { timezone })
    expect(today3.toISOString()).toBe('2024-04-16T00:00:00.000Z')
  })

  test('Europe/Berlin', () => {
    const timezone = 'Europe/Berlin'

    // Mon Oct 02 2023 23:30:00 GMT+0200 (Central European Summer Time)
    const today1 = getStartOfDay(new Date('2023-10-02T21:30:00.000Z'), { timezone })
    expect(today1.toISOString()).toBe('2023-10-01T22:00:00.000Z')

    // Tue Oct 03 2023 01:30:00 GMT+0200 (Central European Summer Time)
    const today2 = getStartOfDay(new Date('2023-10-02T23:30:00.000Z'), { timezone })
    expect(today2.toISOString()).toBe('2023-10-02T22:00:00.000Z')
  })

  test('America/Los_Angeles', () => {
    const timezone = 'America/Los_Angeles'

    // Mon Oct 02 2023 23:30:00 GMT-0700 (Pacific Daylight Time)
    const today1 = getStartOfDay(new Date('2023-10-03T06:30:00.000Z'), { timezone })
    expect(today1.toISOString()).toBe('2023-10-02T07:00:00.000Z')

    // Tue Oct 03 2023 01:30:00 GMT-0700 (Pacific Daylight Time)
    const today2 = getStartOfDay(new Date('2023-10-03T08:30:00.000Z'), { timezone })
    expect(today2.toISOString()).toBe('2023-10-03T07:00:00.000Z')
  })

  test('Australia/Sydney', () => {
    const timezone = 'Australia/Sydney'

    // Mon Oct 02 2023 23:30:00 GMT+1100 (Australian Eastern Daylight Time)
    const today1 = getStartOfDay(new Date('2023-10-02T12:30:00.000Z'), { timezone })
    expect(today1.toISOString()).toBe('2023-10-01T13:00:00.000Z')

    // Tue Oct 03 2023 01:30:00 GMT+1100 (Australian Eastern Daylight Time)
    const today2 = getStartOfDay(new Date('2023-10-02T14:30:00.000Z'), { timezone })
    expect(today2.toISOString()).toBe('2023-10-02T13:00:00.000Z')

    // Sun May 12 2024 08:00:00 GMT+1000 (Australian Eastern Standard Time)
    const today3 = getStartOfDay(new Date('2024-05-11T22:00:00.000Z'), { timezone })
    expect(today3.toISOString()).toBe('2024-05-11T14:00:00.000Z')
  })
})
