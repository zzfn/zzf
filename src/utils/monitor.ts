import UAParser from 'ua-parser-js';
import type { NextWebVitalsMetric } from 'next/app';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

class Monitor {
  private parser: UAParser.UAParserInstance;

  constructor() {
    this.parser = new UAParser();
  }

  async getVisitor(): Promise<string> {
    const vid = localStorage.getItem('visitorId');
    if (localStorage.getItem('visitorId')) {
      return vid;
    }
    const { get } = await FingerprintJS.load({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      region: 'ap',
      endpoint: 'https://fp.zzfzzf.com',
    });
    const { visitorId } = await get();
    localStorage.setItem('visitorId', visitorId);
    return visitorId;
  }

  getOS(): UAParser.IOS {
    return this.parser.getOS();
  }

  getBrowser(): UAParser.IOS {
    return this.parser.getBrowser();
  }

  async loadUrl(url: string, metric: NextWebVitalsMetric): Promise<void> {
    const visitorId = await this.getVisitor();
    if (process.env.NODE_ENV === 'development') return;
    const json = {
      url: `${window.origin}${url}`,
      visitorId: visitorId,
      browser: this.getBrowser().name,
      browserVersion: this.getBrowser().version,
      os: this.getOS().name,
      osVersion: this.getOS().version,
      referrer: document.referrer,
      screen: `${window.screen.width}*${window.screen.height}`,
      ua: window.navigator.userAgent.toLowerCase(),
      name: metric.name,
      value: metric.value,
    };
    new Image().src = `https://log.zzfzzf.com/zzf.gif?body=${window.btoa(
      JSON.stringify(json),
    )}&index=log-performance`;
  }
}

export default Monitor;
