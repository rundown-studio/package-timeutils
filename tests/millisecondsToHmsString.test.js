import { expect } from 'chai'
import { millisecondsToHmsString } from '../dist/esm/index'

describe('millisecondsToHmsString', () => {
  test('0 milliseconds', () => {
    expect(millisecondsToHmsString(0)).to.deep.equal('00:00:00')
  })
  test('100 milliseconds', () => {
    expect(millisecondsToHmsString(100)).to.deep.equal('00:00:00')
  })
  test('1000 milliseconds', () => {
    expect(millisecondsToHmsString(1000)).to.deep.equal('00:00:01')
  })
  test('60000 milliseconds', () => {
    expect(millisecondsToHmsString(60000)).to.deep.equal('00:01:00')
  })
  test('3600000 milliseconds', () => {
    expect(millisecondsToHmsString(3600000)).to.deep.equal('01:00:00')
  })
  test('3723400 milliseconds', () => {
    expect(millisecondsToHmsString(3723400)).to.deep.equal('01:02:03')
  })
})
