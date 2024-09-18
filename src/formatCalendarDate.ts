import { format as dateFormat } from 'date-fns'
import { tz } from '@date-fns/tz'

type FormatCalendarDateOptions = {
  timezone?: string
  locale?: Intl.Locale | string
  format?: string
}

/**
 * Format calendar date using the browser language.
 * The `format` option will overwrite the `locale` option.
 * By default dates are formatted in 'yyyy-MM-dd'.
 *
 * @param  {Date} date
 * @param  {string} [options.timezone = 'UTC']
 * @param  {Intl.Locale | string} [options.locale] - e.g. 'en-US'
 * @param  {string} [options.format] - e.g. 'yyyy-MM-dd'
 * @return {string}
 */
export function formatCalendarDate (
  date: Date,
  {
    timezone = 'UTC',
    locale,
    format,
  }: FormatCalendarDateOptions = {},
) {
  if (!(date instanceof Date)) throw new Error('`date` must be an instance of Date')
  if (!format && !locale) format = 'yyyy-MM-dd'
  if (format) {
    return dateFormat(date, format, { in: tz(timezone) })
  } else {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    if (timezone) options.timeZone = timezone
    const iLocale = locale instanceof Intl.Locale ? locale : new Intl.Locale(locale as string)
    return new Intl.DateTimeFormat(iLocale.baseName, options).format(date)
  }
}
