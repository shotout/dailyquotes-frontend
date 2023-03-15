import {Adjust, AdjustEvent} from 'react-native-adjust';
import analytics from '@react-native-firebase/analytics';
import {isIphone} from '../shared/devices';

export const ONBOARDING_COMPLETE = '8zqgwt';
export const APP_INSTALLED = '3nkdfh';
export const SHOW_PAYWALL = 'nubmht';
export const FREE_TRIAL = 'jrw4sf';

export const CANCEL_SUBSCRIBE_AFTER_TRIAL = 'lb41cg';
export const SUBSCRIPTION_STARTED = '9z8iij';
export const QUOTE_SHARED = 'u80tp1';
export const QUOTE_LIKED = '3jc09q';

export const REVENUE_TRACKING = 'od70qt';

const getScreenName = id => {
  switch (id) {
    case ONBOARDING_COMPLETE:
      return 'ONBOARDING_COMPLETE';
    case APP_INSTALLED:
      return 'APP_INSTALLED';
    case SHOW_PAYWALL:
      return 'SHOW_PAYWALL';
    case FREE_TRIAL:
      return 'FREE_TRIAL';
    case CANCEL_SUBSCRIBE_AFTER_TRIAL:
      return 'CANCEL_SUBSCRIBE_AFTER_TRIAL';
    case SUBSCRIPTION_STARTED:
      return 'SUBSCRIPTION_STARTED';
    case QUOTE_SHARED:
      return 'QUOTE_SHARED';
    case QUOTE_LIKED:
      return 'QUOTE_LIKED';
    case REVENUE_TRACKING:
      return 'SUBSCRIBE';
    default:
      return id;
  }
};

export const eventTracking = async (id, message) => {
  try {
    const adjustEvent = new AdjustEvent(id);
    if (message) {
      adjustEvent.setCallbackId(message);
    }
    Adjust.trackEvent(adjustEvent);
    await analytics().logEvent(getScreenName(id), {
      id,
    });
    console.log('Success tracking:', getScreenName(id));
  } catch (err) {
    console.log('Err tracking:', err);
  }
};

export const revenueTracking = async (price, currency) => {
  const adjustEvent = new AdjustEvent(REVENUE_TRACKING);

  adjustEvent.setRevenue(price, currency);

  Adjust.trackEvent(adjustEvent);
  await analytics().logEvent(getScreenName(REVENUE_TRACKING), {
    id: REVENUE_TRACKING,
    item: `PRICE ${price}, currency ${currency}`,
  });
  console.log('Revenue tracked:', price, currency);
};

export const askTrackingPermission = () => {
  if (isIphone) {
    Adjust.requestTrackingAuthorizationWithCompletionHandler(status => {
      switch (status) {
        case 0:
          // ATTrackingManagerAuthorizationStatusNotDetermined case
          console.log("The user hasn't been asked yet");
          break;
        case 1:
          // ATTrackingManagerAuthorizationStatusRestricted case
          console.log('The user device is restricted');
          break;
        case 2:
          // ATTrackingManagerAuthorizationStatusDenied case
          console.log('The user denied access to IDFA');
          break;
        case 3:
          // ATTrackingManagerAuthorizationStatusAuthorized case
          console.log('The user authorized access to IDFA');
          break;
        default:
          console.log('The status is not available');
          break;
      }
    });
  }
};
