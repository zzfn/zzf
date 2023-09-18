'use client';
import { diff } from 'utils/time';

const TimeDiff = ({ time }: { time: string }) => {
  return diff(time);
};
export default TimeDiff;
