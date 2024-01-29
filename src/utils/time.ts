import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import locale_cn from 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);

export function diff(time: string) {
  return dayjs(time).locale(locale_cn).fromNow();
}

export function format(time: string, template = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).locale(locale_cn).format(template);
}
