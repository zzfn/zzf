import UAParser from 'ua-parser-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

class Monitor {
  private parser: UAParser.UAParserInstance;

  constructor() {
    this.parser = new UAParser();
  }

  async getVisitor(): Promise<string> {
    const { get } = await FingerprintJS.load();
    const { visitorId } = await get();
    return visitorId;
  }

  getOS(): UAParser.IOS {
    return this.parser.getOS();
  }

  getBrowser(): UAParser.IOS {
    return this.parser.getBrowser();
  }

  async loadUrl(metric: any): Promise<void> {
    const visitorId = await this.getVisitor();
    const json = {
      url: window.location.href,
      visitorId: visitorId,
      browser: this.getBrowser().name,
      browserVersion: this.getBrowser().version,
      os: this.getOS().name,
      osVersion: this.getOS().version,
      referrer: document.referrer,
      screen: `${window.screen.width}*${window.screen.height}`,
      ua: window.navigator.userAgent,
      name: metric.name,
      delta: metric.delta,
      navigationType: metric.navigationType,
      rating: metric.rating,
      value: metric.value,
    };
    new Image().src = `https://api.zzfzzf.com/track/log.gif?q=${window.btoa(JSON.stringify(json))}`;
  }
}

export default Monitor;
