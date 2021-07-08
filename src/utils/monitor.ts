import { monitorLoad } from 'api/monitor';

class Monitor {
  loadUrl(url: string, isLandingPage = false): void {
    monitorLoad({
      userAgent: navigator.userAgent,
      content: url,
      type: isLandingPage ? 'LANDING_PAGE' : 'ROUTE_CHANGE',
    });
  }
}

export default Monitor;
