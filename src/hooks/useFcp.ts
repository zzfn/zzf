import { useEffect, useState } from 'react';

function useFcp() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
        setTime(Math.floor(entry.startTime));
      }
    }).observe({ type: 'paint', buffered: true });
  }, []);
  return time;
}

export default useFcp;
