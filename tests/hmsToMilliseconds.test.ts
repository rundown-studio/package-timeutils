
import { hmsToMilliseconds } from '../src/index.js'

describe('hmsToMilliseconds', () => {
  test('hmsToMilliseconds 0:00:00', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0 })).toBe(0)
  })
  test('hmsToMilliseconds 0:00:01', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 1 })).toBe(1000)
  })
  test('hmsToMilliseconds 0:01:00', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 1, seconds: 0 })).toBe(60000)
  })
  test('hmsToMilliseconds 1:00:00', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 0, seconds: 0 })).toBe(3600000)
  })
  test('hmsToMilliseconds 1:02:03', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 2, seconds: 3 })).toBe(3723000)
  })
  test('hmsToMilliseconds 0:00:00.1', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0, decimals: 1 })).toBe(100)
  })
  test('hmsToMilliseconds 0:00:00.9', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0, decimals: 9 })).toBe(900)
  })
  test('hmsToMilliseconds 0:00:01.5', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 1, decimals: 5 })).toBe(1500)
  })
  test('hmsToMilliseconds 0:01:00.1', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 1, seconds: 0, decimals: 1 })).toBe(60100)
  })
  test('hmsToMilliseconds 1:00:00.1', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 0, seconds: 0, decimals: 1 })).toBe(3600100)
  })
  test('hmsToMilliseconds 1:02:03.4', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 2, seconds: 3, decimals: 4 })).toBe(3723400)
  })
})
