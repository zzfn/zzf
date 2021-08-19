import { monitorLoad } from 'api/monitor';
import type { Agent } from '@fingerprintjs/fingerprintjs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParser from 'ua-parser-js';

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
  async loadUrl(url: string): Promise<void> {
    if (process.env.NODE_ENV === 'development') return;
    await monitorLoad({
      url: url,
      visitorId: await this.getVisitorId(),
      browser: this.getBrowser().name,
      browserVersion: this.getBrowser().version,
      os: this.getOS().name,
      osVersion: this.getOS().version,
      referrer: document.referrer,
    });
  }
}

export default Monitor;
