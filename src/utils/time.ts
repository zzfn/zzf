import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import locale_cn from 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
dayjs.extend(utc)
dayjs.extend(timezone)
export function diff(time: string) {
  return dayjs.tz(time,'Asia/Shanghai').utc().locale(locale_cn).fromNow()
}
