'use client';
import dayjs from 'dayjs';

const Time = ({ time }: { time: number }) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
export default Time;
