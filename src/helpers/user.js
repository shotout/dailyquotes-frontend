import moment from 'moment';
import {Linking, Platform} from 'react-native';
import Purchasely, {ProductResult} from 'react-native-purchasely';
import {getUserProfile, setSubcription} from '../shared/request';
import store from '../store/configure-store';
import {fetchCollection, handleSetProfile} from '../store/defaultState/actions';
import {SUCCESS_FETCH_COLLECTION} from '../store/defaultState/types';
import {
  CANCEL_SUBSCRIBE_AFTER_TRIAL,
  eventTracking,
  FREE_TRIAL,
  revenueTracking,
  SHOW_PAYWALL,
  SUBSCRIPTION_STARTED,
} from './eventTracking';

export const dateToUnix = date => moment(date).unix();
export const getFutureDate = (defaultDate, day) =>
  moment(defaultDate).add(day, 'days').format('YYYY-MM-DD');

export const iconIdToName = id => {
  switch (id) {
    case 2:
      return 'second';
    case 3:
      return 'third';
    case 4:
      return 'fourth';
    default:
      return 'first';
  }
};
export const iconNameToId = name => {
  switch (name) {
    case 'second':
      return 2;
    case 'third':
      return 3;
    case 'fourth':
      return 4;
    default:
      return 1;
  }
};

export const isUserPremium = () => {
  const profile = store.getState().defaultState.userProfile;
  const {type} = profile.data.subscription;
  if (type === 1 || type === 5) {
    return false;
  }
  return true;
};

export const isCompletedOnboarding = () => {
  const profile = store.getState().defaultState.userProfile;
  const {type} = profile.data.subscription;
  if (type !== 5) {
    return true;
  }
  return false;
};

export const reloadUserProfile = async () =>
  new Promise(async resolve => {
    const res = await getUserProfile();
    const currentUserProfile = store.getState().defaultState.userProfile;
    store.dispatch(
      handleSetProfile({
        ...currentUserProfile,
        ...res,
      }),
    );
    if (res.data.subscription.type !== 5) {
      if (currentUserProfile.data) {
        if (currentUserProfile.data.subscription.type !== 1) {
          if (res.data.subscription.type === 1) {
            eventTracking(CANCEL_SUBSCRIBE_AFTER_TRIAL);
          }
          if (
            currentUserProfile.data.subscription.type !==
            res.data.subscription.type
          ) {
            if (res.data.subscription.type !== 1) {
              eventTracking(SUBSCRIPTION_STARTED);
              const objPurchase = JSON.parse(
                res.data.subscription.purchasely_data,
              );
              if (objPurchase) {
                revenueTracking(
                  objPurchase.plan_price_in_customer_currency,
                  objPurchase.customer_currency,
                );
              }
            }
          }
        }
      }
    }
    resolve(res.data);
  });

export const handlePayment = async (vendorId, cb) =>
  new Promise(async (resolve, reject) => {
    try {
      eventTracking(SHOW_PAYWALL);

      const purchaseId = await Purchasely.getAnonymousUserId();
      if (vendorId === 'onboarding') {
        await setSubcription({
          subscription_type: 5,
          purchasely_id: purchaseId,
        });
      }
      console.log('Get anonymous id after chang status to 5:', purchaseId);
      const res = await Purchasely.presentPresentationForPlacement({
        placementVendorId: vendorId || 'onboarding',
        isFullscreen: true,
      });
      console.log('Res purchase:', res);
      const user = store.getState().defaultState.userProfile;
      switch (res.result) {
        case ProductResult.PRODUCT_RESULT_PURCHASED:
          if (user.token) {
            await setSubcription({
              subscription_type: vendorId === 'one_month_free' ? 3 : 2,
              subscription_data: res,
              purchasely_id: purchaseId,
            });
            await reloadUserProfile();
          }
          eventTracking(FREE_TRIAL);
          break;
        case ProductResult.PRODUCT_RESULT_RESTORED:
          console.log('Payment restored');
          // let message = null;
          // if (res.plan != null) {
          //   console.log(`User purchased ${res.plan.name}`);
          //   message = res.plan.name;
          // }

          // eventTracking(RESTORE_PURCHASED, message);
          break;
        case ProductResult.PRODUCT_RESULT_CANCELLED:
          console.log('Payment cancel');
          if (Platform.OS === 'android') {
            if (
              !vendorId ||
              vendorId === 'onboarding' ||
              vendorId === 'offer_no_purchase_after_onboarding_paywall'
            ) {
              handlePayment(vendorId);
            }
          }
          // await setSubcription({
          //   subscription_type: 1,
          //   purchasely_id: purchaseId,
          // });
          break;
        default:
          break;
      }
      if (typeof cb === 'function') cb();
      resolve(res);
    } catch (err) {
      console.log('error payment:', err);
    }
  });

export const openPrivacyPolicy = () => {
  Linking.openURL('https://mooti.app/privacy');
};

export const openTermsofUse = () => {
  Linking.openURL('https://mooti.app/terms');
};

export const openImprint = () => {
  Linking.openURL('https://mooti.app/imprint');
};

export const refetchCollection = () => {
  store.dispatch(fetchCollection());
};

export const checkUserStatus = async () => {
  try {
    const subscriptions = await Purchasely.userSubscriptions();
    const res = await Purchasely.getAnonymousUserId();
    console.log(' ==> Subscriptions', res, subscriptions);
    if (subscriptions[0] !== undefined) {
      console.log('plan', subscriptions[0].plan);
      console.log('subscriptionSource', subscriptions[0].subscriptionSource);
      console.log('nextRenewalDate', subscriptions[0].nextRenewalDate);
      console.log('cancelledDate', subscriptions[0].cancelledDate);
    } else {
      await setSubcription({
        subscription_type: 1,
      });
      eventTracking(SUBSCRIPTION_STARTED);
      await reloadUserProfile();
    }
  } catch (e) {
    console.log('Err purchasely user :', e);
  }
};

export const createUniqueID = () =>
  Date.now().toString(36) + Math.random().toString(36);

export const handleSubscriptionStatus = async (subscription = {}) => {
  const purchaseId = await Purchasely.getAnonymousUserId();
  if (subscription.type === 2 || subscription.type === 3) {
    const trialDay = subscription.type === 2 ? 3 : 30;
    const dateEndFreeTrial = getFutureDate(subscription.started, trialDay);
    const nowaDay = moment().format('YYYY-MM-DD');
    const objPurchase = JSON.parse(subscription.purchasely_data);
    if (dateToUnix(dateEndFreeTrial) < dateToUnix(nowaDay)) {
      await setSubcription({
        subscription_type: 4,
        purchasely_id: purchaseId,
      });
      await reloadUserProfile();

      eventTracking(SUBSCRIPTION_STARTED);

      if (objPurchase) {
        revenueTracking(
          objPurchase.plan_price_in_customer_currency,
          objPurchase.customer_currency,
        );
      }
    }
  }
};

export const setCollectionData = payload => {
  store.dispatch({type: SUCCESS_FETCH_COLLECTION, payload});
};

export const makeid = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
