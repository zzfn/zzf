import dayjs from 'dayjs';

export function diff(time: string): string {
  if (dayjs().diff(time, 'minute') < 60) {
    return `${dayjs().diff(time, 'minute')}分钟前`;
  } else if (dayjs().diff(time, 'hour') < 24) {
    return `${dayjs().diff(time, 'hour')}小时前`;
  } else {
    return `${dayjs().diff(time, 'day')}天前`;
  }
}
