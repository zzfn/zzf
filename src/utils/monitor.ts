import { monitorLoad } from 'api/monitor';
import type { Agent } from '@fingerprintjs/fingerprintjs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParser from 'ua-parser-js';
import type { NextWebVitalsMetric } from 'next/app';

class Monitor {
  private readonly fpPromise: Promise<Agent>;
  private parser: UAParser.UAParserInstance;

  constructor() {
    this.fpPromise = FingerprintJS.load();
    this.parser = new UAParser();
  }

  async getVisitorId(): Promise<string> {
    const fp = await this.fpPromise;
    const result = await fp.get();
    return result.visitorId;
  }

  getOS(): UAParser.IOS {
    return this.parser.getOS();
  }

  getBrowser(): UAParser.IOS {
    return this.parser.getBrowser();
  }

  async loadUrl(url: string, metric: NextWebVitalsMetric): Promise<void> {
    new Image().src = 'https://api.zzfzzf.com/sa.gif?id=2';
    if (process.env.NODE_ENV === 'development') return;
    await monitorLoad({
      url,
      visitorId: await this.getVisitorId(),
      browser: this.getBrowser().name,
      browserVersion: this.getBrowser().version,
      os: this.getOS().name,
      osVersion: this.getOS().version,
      referrer: document.referrer,
      name: metric.name,
      value: metric.value,
    });
  }
}

export default Monitor;
