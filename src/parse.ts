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
