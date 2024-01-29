'use client';

import { useReportWebVitals } from 'next/web-vitals';
import Monitor from 'utils/monitor';

export function WebVitals() {
  useReportWebVitals(async (metric) => {
    const monitor = new Monitor();
    await monitor.loadUrl(metric);
  });
  return null;
}
