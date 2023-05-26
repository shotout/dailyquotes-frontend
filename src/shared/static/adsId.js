import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

export const getAppOpenID = () => {
  if (__DEV__) {
    return TestIds.APP_OPEN;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/7984907356';
  }
  return 'ca-app-pub-1891825795064804/9084072895';
};

export const getAdaptiveBannerID = () => {
  if (__DEV__) {
    return TestIds.GAM_BANNER;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/2710236237';
  }
  return 'ca-app-pub-1891825795064804/1285473922';
};

export const getRewardedCategoryID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/7215407701';
  }
  return 'ca-app-pub-1891825795064804/1959497003';
};

export const getRewardedOutOfQuotesID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/8720061063';
  }
  return 'ca-app-pub-1891825795064804/1584092487';
};

export const getRewardedThemeID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/4624903383';
  }
  return 'ca-app-pub-1891825795064804/8026211906';
};

export const getRewardedInsterstialID = () => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/3415995971';
  }
  return 'ca-app-pub-1891825795064804/8980185989';
};
