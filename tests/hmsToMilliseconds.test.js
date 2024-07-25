import { expect } from 'chai'
import { hmsToMilliseconds } from '../dist/esm/index'

describe('hmsToMilliseconds', () => {
  test('hmsToMilliseconds 0:00:00', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0 })).to.equal(0)
  })
  test('hmsToMilliseconds 0:00:01', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 1 })).to.equal(1000)
  })
  test('hmsToMilliseconds 0:01:00', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 1, seconds: 0 })).to.equal(60000)
  })
  test('hmsToMilliseconds 1:00:00', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 0, seconds: 0 })).to.equal(3600000)
  })
  test('hmsToMilliseconds 1:02:03', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 2, seconds: 3 })).to.equal(3723000)
  })
  test('hmsToMilliseconds 0:00:00.1', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0, decimals: 1 })).to.equal(100)
  })
  test('hmsToMilliseconds 0:00:00.9', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 0, decimals: 9 })).to.equal(900)
  })
  test('hmsToMilliseconds 0:00:01.5', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 0, seconds: 1, decimals: 5 })).to.equal(1500)
  })
  test('hmsToMilliseconds 0:01:00.1', () => {
    expect(hmsToMilliseconds({ hours: 0, minutes: 1, seconds: 0, decimals: 1 })).to.equal(60100)
  })
  test('hmsToMilliseconds 1:00:00.1', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 0, seconds: 0, decimals: 1 })).to.equal(3600100)
  })
  test('hmsToMilliseconds 1:02:03.4', () => {
    expect(hmsToMilliseconds({ hours: 1, minutes: 2, seconds: 3, decimals: 4 })).to.equal(3723400)
  })
})
