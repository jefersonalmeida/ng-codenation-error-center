import { environment } from '../../../environments/environment';

declare let gtag: Function;

export class AnalyticsService {

  constructor() {
  }

  public static eventEmitter(eventAction: string,
                             eventCategory: string,
                             eventLabel: string = null,
                             eventValue: number = null) {

    if (environment.services.google.analytics.enabled) {
      gtag('event', eventAction, {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventValue: eventValue,
      });
    }
  }
}
