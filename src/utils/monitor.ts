import type { Agent, GetResult } from '@fingerprintjs/fingerprintjs-pro';
import UAParser from 'ua-parser-js';
import type { NextWebVitalsMetric } from 'next/app';

class Monitor {
  private parser: UAParser.UAParserInstance;
  private fpPromise: Promise<GetResult>;

  constructor() {
    this.parser = new UAParser();
    this.fpPromise = null;
  }

  async getVisitor(): Promise<GetResult> {
    let visitor = JSON.parse(localStorage.getItem('visitor'));
    if (!visitor || !visitor.visitorId) {
      if(!this.fpPromise){
        this.fpPromise = import('@fingerprintjs/fingerprintjs-pro').then((FingerprintJS) =>
            FingerprintJS.load({
              apiKey: 'jt14U0jzVYNn41hfNVbb',
              region: 'ap',
              endpoint: 'https://fp.zzfzzf.com',
            }),
        ).then(agent=>agent.get());
      }
      visitor = await this.fpPromise;
      localStorage.setItem('visitor', JSON.stringify(visitor));
    }
    return visitor;
  }

  getOS(): UAParser.IOS {
    return this.parser.getOS();
  }

  getBrowser(): UAParser.IOS {
    return this.parser.getBrowser();
  }

  async loadUrl(url: string, metric: NextWebVitalsMetric): Promise<void> {
    if (process.env.NODE_ENV === 'development') return;
    const visitor = await this.getVisitor();
    const json = {
      url: `${window.origin}${url}`,
      visitorId: visitor.visitorId,
      visitorFound: visitor.visitorFound,
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
