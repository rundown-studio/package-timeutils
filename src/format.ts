import { TimezoneOption } from './types'
import { lightFormat } from 'date-fns'
import { TZDate } from '@date-fns/tz'

export function format (
  date: Date,
  formatStr: string,
  {
    timezone = 'UTC',
  }: TimezoneOption = {},
): string {
  const zonedDate = new TZDate(date, timezone)
  return lightFormat(zonedDate, formatStr)
}
