import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import notifee, {EventType} from '@notifee/react-native';
import TimeZone from 'react-native-timezone';

// Redux
import {connect} from 'react-redux';
import {AppState, Linking, Platform, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Purchasely from 'react-native-purchasely';
import {AppOpenAd, AdEventType} from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import states from './states';
import dispatcher from './dispatcher';

// ADS

// Ref routing
import {navigate, navigationRef, reset} from '../../shared/navigationRef';
import navigationData from '../../shared/navigationData';
// Screen
import WelcomePage from '../welcome-page';
import Register from '../register';
import MainPage from '../main-page';

import {APP_VERSION} from '../../shared/static';
import {handleModalFirstPremium} from '../../shared/globalContent';
import {
  checkDeviceRegister,
  getSetting,
  selectTheme,
  updateProfile,
  postRegister,
} from '../../shared/request';
import {
  handlePayment,
  handlePaymentTwo,
  handleSubscriptionStatus,
  isUserPremium,
  iconNameToId,
  reloadUserProfile,
} from '../../helpers/user';
import {scrollToTopQuote} from '../../store/defaultState/selector';
import NotificationTester from '../notification-tester';
import {navigationLinking} from '../../shared/navigationLinking';
import {
  handleSetProfile,
  hideLoadingModal,
  setAnimationCounter,
  setAnimationSlideStatus,
  setCounterNumber,
  setInitialLoaderStatus,
  setPaywallNotification,
  showLoadingModal,
} from '../../store/defaultState/actions';
import {getAppOpenID} from '../../shared/static/adsId';
import AdsOverlay from '../ads-overlay';
import store from '../../store/configure-store';
import {loadOpenAddsReward} from '../../helpers/loadReward';

const adUnitId = getAppOpenID();

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Stack = createNativeStackNavigator();

appOpenAd.load();

function Routes({
  getInitialData,
  userProfile,
  fetchListQuote,
  fetchCollection,
  fetchPastQuotes,
  fetchListLiked,
  activeVersion,
  handleAppVersion,
  registerData,
  quotes,
}) {
  const [isLoading, setLoading] = useState(true);
  const [showAdsOverlay, setAdsOverlay] = useState(false);
  const appState = useRef(AppState.currentState);
  const loadingRef = useRef(true);
  const paywallStatus = useRef(null);
  const openAdsOpened = useRef(false);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [mutateForm, setMutateForm] = useState({
    style: 1,
    fcm_token: null,
    purchasely_id: null,
    device_id: null,
  });

  const handleSubmitPremiumStatusWeekly = async submitObj => {
    handleModalFirstPremium(true);
    const objData = JSON.stringify(submitObj);
    await AsyncStorage.setItem('freePremiumStatusWeekly', objData);
  };

  const handleSubmitPremiumStatusDaily = async submitObj => {
    const objData = JSON.stringify(submitObj);
    await AsyncStorage.setItem('freePremiumStatusDaily', objData);
  };

  const handleUpdateTimezone = async () => {
    const timeZone = await TimeZone.getTimeZone();
    if (userProfile.token) {
      if (userProfile.data.schedule.timezone !== timeZone)
        await updateProfile({
          timezone: timeZone,
          _method: 'PATCH',
        });
      setTimeout(() => {
        reloadUserProfile();
      }, 3000);
    }
  };

  const handleShowFreePremiumWeekly = async () => {
    if (userProfile.token && !isUserPremium()) {
      const premiumStatus = await AsyncStorage.getItem(
        'freePremiumStatusWeekly',
      );
      if (premiumStatus) {
        const objStatus = JSON.parse(premiumStatus);
        if (
          (objStatus.activeDate !== moment().format('YYYY-MM-DD') &&
            objStatus.activeStatus <= 6) ||
          (objStatus.activeStatus > 7 && objStatus.activeStatus % 3 === 0)
        ) {
          const submitObj = {
            activeDate: moment().format('YYYY-MM-DD'),
            activeStatus: objStatus.activeStatus + 1,
          };
          handleSubmitPremiumStatusWeekly(submitObj);
        }
      } else {
        const submitObj = {
          activeDate: moment().format('YYYY-MM-DD'),
          activeStatus: 1,
        };
        handleSubmitPremiumStatusWeekly(submitObj);
      }
    }
  };

  const handleShowFreePremiumDaily = async () => {
    if (userProfile.token && !isUserPremium()) {
      const premiumStatus = await AsyncStorage.getItem(
        'freePremiumStatusDaily',
      );
      if (premiumStatus) {
        const objStatus = JSON.parse(premiumStatus);
        if (objStatus.activeDate !== moment().format('YYYY-MM-DD')) {
          const submitObj = {
            activeDate: moment().format('YYYY-MM-DD'),
            activeStatus: 1,
          };
          handleSubmitPremiumStatusDaily(submitObj);
        } else if (objStatus.activeStatus === 5) {
          handleModalFirstPremium(true);
          const submitObj = {
            activeDate: moment().format('YYYY-MM-DD'),
            activeStatus: objStatus.activeStatus + 1,
          };
          handleSubmitPremiumStatusDaily(submitObj);
        } else {
          const submitObj = {
            activeDate: moment().format('YYYY-MM-DD'),
            activeStatus: objStatus.activeStatus + 1,
          };
          handleSubmitPremiumStatusDaily(submitObj);
        }
      } else {
        const submitObj = {
          activeDate: moment().format('YYYY-MM-DD'),
          activeStatus: 1,
        };
        handleSubmitPremiumStatusDaily(submitObj);
      }
    }
  };

  const resetNotificationBadge = () => {
    notifee.setBadgeCount(0).then(() => {
      if (userProfile.token) {
        updateProfile({
          notif_count: 0,
          _method: 'PATCH',
        });
      }
    });
  };

  const handleDecrementBadgeCount = () => {
    notifee
      .decrementBadgeCount()
      .then(() => notifee.getBadgeCount())
      .then(count => {
        if (userProfile.token) {
          updateProfile({
            notif_count: count,
            _method: 'PATCH',
          });
        }
      });
  };

  const callbackError = () => {
    if (userProfile.token && quotes.listData?.length > 0) {
      setLoading(false);
    }
  };

  const handleSelectTheme = async res => {
    if (userProfile.data.themes?.length > 0) {
      if (
        res?.themes?.length === 1 ||
        userProfile.data.themes[0].id !== res?.themes[0]?.id
      ) {
        selectTheme({
          _method: 'PATCH',
          themes: [userProfile.data.themes[0].id],
        });
      }
    }
    // if (
    //   (res.subscription.type === 1 && res.themes[0].id !== 6) ||
    //   (userProfile.data.themes?.length === 0 && res.themes.length === 0)
    // ) {
    //   selectTheme({
    //     _method: 'PATCH',
    //     themes: [6],
    //   });
    // }
  };

  const handleNotificationQuote = async (res, remoteMessage, getInitialURL) => {
    let idQuote = null;
    if (getInitialURL) {
      const urlArr = getInitialURL.split('/');
      if (urlArr[3]) {
        idQuote = urlArr[3];
      }
    }
    if (
      (res?.subscription?.type === 1 && res?.themes[0]?.id !== 6) ||
      remoteMessage?.data?.id ||
      idQuote
    ) {
      await fetchListQuote({notif: remoteMessage?.data?.id || idQuote || null});
      if (remoteMessage) {
        handleDecrementBadgeCount();
      } else {
        resetNotificationBadge();
      }
    } else {
      fetchListQuote();
    }
  };

  const handleNotificationOpened = resProfile => {
    let isAbleToFetchQuote = true;
    notifee.onForegroundEvent(async ({type, detail}) => {
      if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
        if (detail.notification.data?.id) {
          isAbleToFetchQuote = false;
          handleDecrementBadgeCount();
          if (detail.notification.data?.id) {
            await fetchListQuote({
              notif: detail.notification.data?.id || null,
            });
            scrollToTopQuote();
          }
        }
        if (detail.notification.data?.type === 'paywall') {
          console.log('Check paywall data:', detail.notification.data);
          if (loadingRef.current) {
            setPaywallNotification(detail.notification.data);
            loadingRef.current = false;
          } else {
            setTimeout(() => {
              handlePayment(detail.notification.data?.placement);
            }, 1000);
          }
        }
      }
    });
    setTimeout(async () => {
      if (isAbleToFetchQuote) {
        const getInitialURL = await Linking.getInitialURL();
        handleNotificationQuote(resProfile, null, getInitialURL);
      }
    }, 2000);
  };

  const handleInitialData = async () => {
    if (userProfile.token) {
      await getInitialData(callbackError);
      setCounterNumber(99);
    } else {
      await getInitialData(callbackError);
    }
  };

  const handleDidMount = async resProfile => {
    try {
      setAnimationSlideStatus(false);
      setAnimationCounter(true);
      setPaywallNotification(null);
      showLoadingModal();
      Purchasely.isReadyToPurchase(true);
      resetNotificationBadge();
      handleInitialData();
      if (activeVersion !== APP_VERSION) {
        handleAppVersion();
        setTimeout(() => {
          setLoading(false);
          SplashScreen.hide();
        }, 2000);
      } else if (userProfile.token) {
        const fetchUserData = async () => {
          if (!isUserPremium()) {
            handleShowAds();
          }
          const setting = await getSetting();
          if (setting.data.value !== 'true') {
            handleShowFreePremiumWeekly();
            handleShowFreePremiumDaily();
          }
          const res = resProfile;

          handleNotificationOpened(resProfile);
          await handleSelectTheme(res);
          setCounterNumber(99);
          handleSubscriptionStatus(res.subscription);
          fetchCollection();
          fetchListLiked();
          fetchPastQuotes();
          setLoading(false);
          handleUpdateTimezone();
          if (isUserPremium()) {
            SplashScreen.hide();
          }
          setTimeout(() => {
            loadingRef.current = false;
          }, 10000);
        };
        fetchUserData();
        showLoadingModal();
      } else {
        setCounterNumber(99);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      console.log('Check err didmount:', err);
      callbackError();
      hideLoadingModal();
      SplashScreen.hide();
    }
  };

  const purchaselyListener = () => {
    Purchasely.addEventListener(event => {
      paywallStatus.current = event.name;
      const animationStatus = store.getState().defaultState.runAnimationSlide;
      if (event.name === 'PRESENTATION_CLOSED') {
        if (animationStatus === false) {
          setAnimationSlideStatus(true);
        }
      }
    });

    Purchasely.addPurchasedListener(res => {
      // User has successfully purchased a product, reload content
      console.log('User has purchased', res);
    });
  };

  const handleShowAds = async () => {
    const isFinishTutorial = await AsyncStorage.getItem('isFinishTutorial');
    appOpenAd.load();
    if (isFinishTutorial === 'yes' && userProfile?.token) {
      if (appOpenAd.loaded) {
        appOpenAd.show();
      } else {
        const cbFinishOpenAds = () => {
          SplashScreen.hide();
          setInitialLoaderStatus(true);
          setAdsOverlay(false);
          console.log('CALLBACK FINISH CALLED');
        };
        console.log('LOAD IN APP ADS VIA FORCE LOAD');
        // cbFinishOpenAds();
        loadOpenAddsReward(appOpenAd, cbFinishOpenAds);
      }
    } else {
      SplashScreen.hide();
      setInitialLoaderStatus(true);
    }
  };

  const handleLoadInAppAds = async () => {
    const isFinishTutorial = await AsyncStorage.getItem('isFinishTutorial');
    if (isFinishTutorial === 'yes') {
      if (appOpenAd.loaded) {
        setAdsOverlay(true);
        appOpenAd.show();
      }
    }
  };

  const getUserdata = async () => {
    const goToFirstPage = () => {
      handleAppVersion();
      setTimeout(() => {
        setLoading(false);
        SplashScreen.hide();
        handleDidMount();
      }, 2000);
    };
    try {
      if (userProfile?.token) {
        const resProfile = await reloadUserProfile();
        handleDidMount(resProfile);
      } else {
        goToFirstPage();
      }
    } catch (err) {
      DeviceInfo.getUniqueId().then(async uniqueId => {
        try {
          await messaging().setAPNSToken('test');
          const fcmToken = await messaging().getToken();
          const isSetBefore = await AsyncStorage.getItem('customIcon');
          const id = await Purchasely.getAnonymousUserId();

          try {
            const timeZone = await TimeZone.getTimeZone();
            const payload = {
              name: 'User',
              anytime: null,
              often: 15,
              start: '08:00',
              end: '20:00',
              gender: '',
              feel: 6,
              ways: [6],
              areas: [1, 2, 3, 4, 5, 6, 7, 8],
              timezone: timeZone,
              fcm_token: fcmToken,
              device_id: uniqueId,
              style: iconNameToId(isSetBefore),
              purchasely_id: id,
            };
            const res = await postRegister(payload);
            const resp = await checkDeviceRegister({
              device_id: uniqueId,
            });

            const currentUserProfile =
              store.getState().defaultState.userProfile;
            store.dispatch(
              handleSetProfile({
                ...currentUserProfile,
                ...resp,
              }),
            );
            handleSubscriptionStatus(resp.data.subscription);
            handlePaymentTwo('onboarding');
            if (
              resp.data.subscription.type === 1 &&
              resp.data.themes[0].id !== 6
            ) {
              await selectTheme({
                _method: 'PATCH',
                themes: [6],
              });
            }
            await updateProfile({
              ...payload,
              _method: 'PATCH',
            });
            setTimeout(() => {
              reloadUserProfile();
            }, 2000);
            await AsyncStorage.setItem('isFinishTutorial', 'yes');
          } catch (err) {
            console.log('Error register:', err);
          }
        } catch (err) {
          console.log('Err get device info:', err);
        }
      });

      // DeviceInfo.getUniqueId().then(async uniqueId => {
      //   const timeZone = await TimeZone.getTimeZone();
      //   const payload = {
      //     ...mutateForm,
      //     name: 'User',
      //     anytime: null,
      //     often: 15,
      //     start: '08:00',
      //     end: '20:00',
      //     gender: '',
      //     feel: 6,
      //     ways: [6],
      //     areas: [1, 2, 3, 4, 5, 6, 7, 8],
      //     timezone: timeZone,
      //   };
      //   const fcmToken = await messaging().getToken();
      //   const isSetBefore = await AsyncStorage.getItem('customIcon');
      //   const id = await Purchasely.getAnonymousUserId();
      //   setMutateForm({
      //     ...mutateForm,
      //     fcm_token: fcmToken,
      //     device_id: uniqueId,
      //     // device_id: Date.now().toString(),
      //     purchasely_id: id,
      //   });
      //   console.log('Err fetch profile:', err);
      //   const res = await checkDeviceRegister({
      //     device_id: uniqueId,
      //   });

      //   handleSetProfile(res);
      //   handleSubscriptionStatus(res.data.subscription);

      //   handlePaymentTwo('onboarding');
      //   if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
      //     await selectTheme({
      //       _method: 'PATCH',
      //       themes: [6],
      //     });
      //   }
      //   await updateProfile({
      //     ...payload,
      //     _method: 'PATCH',
      //   });
      //   setTimeout(() => {
      //     reloadUserProfile();
      //   }, 2000);
      // });
      goToFirstPage();
    }
  };

  useEffect(() => {
    if (!userProfile?.token) {
      SplashScreen.hide();
    }

    setInitialLoaderStatus(false);
    getUserdata();
    purchaselyListener();
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          resetNotificationBadge();
          handleUpdateTimezone();
        }
        if (appState.current.match('background') && nextAppState === 'active') {
          appOpenAd.load();
          if (
            paywallStatus &&
            paywallStatus.current !== 'PRESENTATION_CLOSED'
          ) {
            if (Platform.OS === 'ios') {
              handleLoadInAppAds();
            }
          } else {
            appOpenAd.load();
          }
        } else {
          paywallStatus.current = 'READY';
          appOpenAd.load();
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      },
    );

    const unsubscribeAppOpenAds = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdsOverlay(false);
      },
    );

    const listenerOpenApps = appOpenAd.addAdEventListener(
      AdEventType.OPENED,
      () => {
        console.log('OPEN ADS OPENED');
        SplashScreen.hide();
        setAdsOverlay(true);
        openAdsOpened.current = true;
      },
    );

    const listenerIAPAds = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        openAdsOpened.current = false;
        setInitialLoaderStatus(true);
        if (loadingRef.current) {
          loadingRef.current = false;
        }
      },
    );
    return () => {
      subscription.remove();
      Purchasely.removeEventListener();
      unsubscribeAppOpenAds();
      listenerOpenApps();
      listenerIAPAds();
    };
  }, []);

  function getInitialRoute() {
    if (userProfile?.token || registerData?.registerStep === 8) {
      return 'MainPage';
    }
    if (registerData) {
      return 'Register';
    }
    return 'WelcomePage';
  }
  if (isLoading) return null;
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <NavigationContainer ref={navigationRef} linking={navigationLinking}>
        <Stack.Navigator initialRouteName={getInitialRoute()}>
          <Stack.Screen
            options={navigationData.noHeader.options}
            name="WelcomePage"
            component={WelcomePage}
          />
          <Stack.Screen
            options={navigationData.noHeader.options}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={navigationData.noHeader.options}
            name="MainPage"
            component={MainPage}
          />
          <Stack.Screen
            options={navigationData.noHeader.options}
            name="NotificationTester"
            component={NotificationTester}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {showAdsOverlay && <AdsOverlay />}
    </View>
  );
}

Routes.propTypes = {
  getInitialData: PropTypes.func.isRequired,
  fetchListQuote: PropTypes.func.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  fetchPastQuotes: PropTypes.func.isRequired,
  handleAppVersion: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  activeVersion: PropTypes.any,
};

Routes.defaultProps = {
  userProfile: {},
  activeVersion: null,
};

export default connect(states, dispatcher)(Routes);
