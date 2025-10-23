import { expect } from 'chai'
import { roundMsToSeconds } from '../dist/index.js'

describe('roundMsToSeconds', () => {
  describe('with default rounding (Math.ceil)', () => {
    test('rounds positive milliseconds up', () => {
      expect(roundMsToSeconds(1)).to.equal(1000)
      expect(roundMsToSeconds(500)).to.equal(1000)
      expect(roundMsToSeconds(999)).to.equal(1000)
      expect(roundMsToSeconds(1000)).to.equal(1000)
      expect(roundMsToSeconds(1001)).to.equal(2000)
      expect(roundMsToSeconds(1500)).to.equal(2000)
    })

    test('handles zero', () => {
      expect(roundMsToSeconds(0)).to.equal(0)
    })

    test('rounds near-zero negative values up to 0', () => {
      expect(roundMsToSeconds(-1)).to.equal(0)
      expect(roundMsToSeconds(-500)).to.equal(0)
      expect(roundMsToSeconds(-999)).to.equal(0)
    })

    test('rounds overtime (negative) values correctly', () => {
      expect(roundMsToSeconds(-1000)).to.equal(-1000)
      expect(roundMsToSeconds(-1001)).to.equal(-1000)
      expect(roundMsToSeconds(-1500)).to.equal(-1000)
      expect(roundMsToSeconds(-1999)).to.equal(-1000)
      expect(roundMsToSeconds(-2000)).to.equal(-2000)
      expect(roundMsToSeconds(-2001)).to.equal(-2000)
    })

    test('handles large values', () => {
      expect(roundMsToSeconds(3600000)).to.equal(3600000) // 1 hour
      expect(roundMsToSeconds(3600500)).to.equal(3601000) // 1 hour + 500ms
      expect(roundMsToSeconds(-3600000)).to.equal(-3600000) // -1 hour
      expect(roundMsToSeconds(-3600500)).to.equal(-3600000) // -1 hour - 500ms
    })
  })

  describe('with custom rounding function', () => {
    test('Math.floor rounds down for positive values', () => {
      expect(roundMsToSeconds(1, Math.floor)).to.equal(0)
      expect(roundMsToSeconds(500, Math.floor)).to.equal(0)
      expect(roundMsToSeconds(999, Math.floor)).to.equal(0)
      expect(roundMsToSeconds(1000, Math.floor)).to.equal(1000)
      expect(roundMsToSeconds(1500, Math.floor)).to.equal(1000)
      expect(roundMsToSeconds(1999, Math.floor)).to.equal(1000)
    })

    test('Math.floor rounds down for negative values', () => {
      expect(roundMsToSeconds(-1, Math.floor)).to.equal(-1000)
      expect(roundMsToSeconds(-500, Math.floor)).to.equal(-1000)
      expect(roundMsToSeconds(-999, Math.floor)).to.equal(-1000)
      expect(roundMsToSeconds(-1000, Math.floor)).to.equal(-1000)
      expect(roundMsToSeconds(-1500, Math.floor)).to.equal(-2000)
    })

    test('Math.round rounds to nearest second', () => {
      expect(roundMsToSeconds(400, Math.round)).to.equal(0)
      expect(roundMsToSeconds(500, Math.round)).to.equal(1000)
      expect(roundMsToSeconds(1400, Math.round)).to.equal(1000)
      expect(roundMsToSeconds(1500, Math.round)).to.equal(2000)
      expect(roundMsToSeconds(-400, Math.round)).to.equal(0)
      expect(roundMsToSeconds(-500, Math.round)).to.equal(0) // Math.round(-0.5) = -0, not -1
      expect(roundMsToSeconds(-600, Math.round)).to.equal(-1000) // Math.round(-0.6) = -1
    })

    test('Math.trunc rounds toward zero', () => {
      expect(roundMsToSeconds(1500, Math.trunc)).to.equal(1000)
      expect(roundMsToSeconds(-1500, Math.trunc)).to.equal(-1000)
    })
  })

  describe('boundary conditions', () => {
    test('exact second boundaries', () => {
      expect(roundMsToSeconds(1000)).to.equal(1000)
      expect(roundMsToSeconds(2000)).to.equal(2000)
      expect(roundMsToSeconds(-1000)).to.equal(-1000)
      expect(roundMsToSeconds(-2000)).to.equal(-2000)
    })

    test('1ms before and after boundaries', () => {
      expect(roundMsToSeconds(999)).to.equal(1000)
      expect(roundMsToSeconds(1001)).to.equal(2000)
      expect(roundMsToSeconds(-999)).to.equal(0)
      expect(roundMsToSeconds(-1001)).to.equal(-1000)
    })
  })
})
