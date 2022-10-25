import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import locale_cn from 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
export function diff(time: string) {
  return dayjs(time).locale(locale_cn).fromNow();
}
