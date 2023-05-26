import {RewardedAd} from 'react-native-google-mobile-ads';
import {getRewardedOutOfQuotesID} from '../shared/static/adsId';

export const loadRewarded = async handleOpen =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedOutOfQuotesID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
