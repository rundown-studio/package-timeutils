
import { roundMsToSeconds } from '../src/index.js'

describe('roundMsToSeconds', () => {
  describe('with default rounding (Math.ceil)', () => {
    test('rounds positive milliseconds up', () => {
      expect(roundMsToSeconds(1)).toBe(1000)
      expect(roundMsToSeconds(500)).toBe(1000)
      expect(roundMsToSeconds(999)).toBe(1000)
      expect(roundMsToSeconds(1000)).toBe(1000)
      expect(roundMsToSeconds(1001)).toBe(2000)
      expect(roundMsToSeconds(1500)).toBe(2000)
    })

    test('handles zero', () => {
      expect(roundMsToSeconds(0)).toBe(0)
    })

    test('rounds near-zero negative values up to 0', () => {
      expect(roundMsToSeconds(-1)).toBe(0)
      expect(roundMsToSeconds(-500)).toBe(0)
      expect(roundMsToSeconds(-999)).toBe(0)
    })

    test('rounds overtime (negative) values correctly', () => {
      expect(roundMsToSeconds(-1000)).toBe(-1000)
      expect(roundMsToSeconds(-1001)).toBe(-1000)
      expect(roundMsToSeconds(-1500)).toBe(-1000)
      expect(roundMsToSeconds(-1999)).toBe(-1000)
      expect(roundMsToSeconds(-2000)).toBe(-2000)
      expect(roundMsToSeconds(-2001)).toBe(-2000)
    })

    test('handles large values', () => {
      expect(roundMsToSeconds(3600000)).toBe(3600000) // 1 hour
      expect(roundMsToSeconds(3600500)).toBe(3601000) // 1 hour + 500ms
      expect(roundMsToSeconds(-3600000)).toBe(-3600000) // -1 hour
      expect(roundMsToSeconds(-3600500)).toBe(-3600000) // -1 hour - 500ms
    })
  })

  describe('with custom rounding function', () => {
    test('Math.floor rounds down for positive values', () => {
      expect(roundMsToSeconds(1, Math.floor)).toBe(0)
      expect(roundMsToSeconds(500, Math.floor)).toBe(0)
      expect(roundMsToSeconds(999, Math.floor)).toBe(0)
      expect(roundMsToSeconds(1000, Math.floor)).toBe(1000)
      expect(roundMsToSeconds(1500, Math.floor)).toBe(1000)
      expect(roundMsToSeconds(1999, Math.floor)).toBe(1000)
    })

    test('Math.floor rounds down for negative values', () => {
      expect(roundMsToSeconds(-1, Math.floor)).toBe(-1000)
      expect(roundMsToSeconds(-500, Math.floor)).toBe(-1000)
      expect(roundMsToSeconds(-999, Math.floor)).toBe(-1000)
      expect(roundMsToSeconds(-1000, Math.floor)).toBe(-1000)
      expect(roundMsToSeconds(-1500, Math.floor)).toBe(-2000)
    })

    test('Math.round rounds to nearest second', () => {
      expect(roundMsToSeconds(400, Math.round)).toBe(0)
      expect(roundMsToSeconds(500, Math.round)).toBe(1000)
      expect(roundMsToSeconds(1400, Math.round)).toBe(1000)
      expect(roundMsToSeconds(1500, Math.round)).toBe(2000)
      expect(roundMsToSeconds(-400, Math.round)).toBe(0)
      expect(roundMsToSeconds(-500, Math.round)).toBe(0) // Math.round(-0.5) = -0, converted to 0
      expect(roundMsToSeconds(-600, Math.round)).toBe(-1000) // Math.round(-0.6) = -1
    })

    test('Math.trunc rounds toward zero', () => {
      expect(roundMsToSeconds(1500, Math.trunc)).toBe(1000)
      expect(roundMsToSeconds(-1500, Math.trunc)).toBe(-1000)
    })
  })

  describe('boundary conditions', () => {
    test('exact second boundaries', () => {
      expect(roundMsToSeconds(1000)).toBe(1000)
      expect(roundMsToSeconds(2000)).toBe(2000)
      expect(roundMsToSeconds(-1000)).toBe(-1000)
      expect(roundMsToSeconds(-2000)).toBe(-2000)
    })

    test('1ms before and after boundaries', () => {
      expect(roundMsToSeconds(999)).toBe(1000)
      expect(roundMsToSeconds(1001)).toBe(2000)
      expect(roundMsToSeconds(-999)).toBe(0)
      expect(roundMsToSeconds(-1001)).toBe(-1000)
    })
  })
})
