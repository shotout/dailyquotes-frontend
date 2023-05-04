import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import TimeZone from 'react-native-timezone';

// Redux
import {connect} from 'react-redux';
import {Alert, AppState, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Purchasely from 'react-native-purchasely';
import states from './states';
import dispatcher from './dispatcher';

// Ref routing
import {navigationRef} from '../../shared/navigationRef';
import navigationData from '../../shared/navigationData';

// Screen
import WelcomePage from '../welcome-page';
import Register from '../register';
import MainPage from '../main-page';

import {APP_VERSION} from '../../shared/static';
import {handleModalFirstPremium} from '../../shared/globalContent';
import {
  getSetting,
  getUserProfile,
  selectTheme,
  updateProfile,
} from '../../shared/request';
import {
  handlePayment,
  handleSubscriptionStatus,
  isUserPremium,
  reloadUserProfile,
} from '../../helpers/user';
import {scrollToTopQuote} from '../../store/defaultState/selector';
import NotificationTester from '../notification-tester';
import {navigationLinking} from '../../shared/navigationLinking';
import {
  hideLoadingModal,
  setCounterNumber,
  showLoadingModal,
} from '../../store/defaultState/actions';

const Stack = createNativeStackNavigator();

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
  const [paywallObj, setPaywallObj] = useState(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
        res.themes.length === 0 ||
        userProfile.data.themes[0].id !== res.themes[0].id
      ) {
        selectTheme({
          _method: 'PATCH',
          themes: [userProfile.data.themes[0].id],
        });
      }
    }
    if (
      (res.subscription.type === 1 && res.themes[0].id !== 6) ||
      (userProfile.data.themes?.length === 0 && res.themes.length === 0)
    ) {
      await selectTheme({
        _method: 'PATCH',
        themes: [6],
      });
    }
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
      (res.subscription.type === 1 && res.themes[0].id !== 6) ||
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

  const handleNotificationOpened = () => {
    notifee.onForegroundEvent(async ({type, detail}) => {
      if (
        (type === EventType.ACTION_PRESS || type === EventType.PRESS) &&
        detail.notification.data?.id
      ) {
        handleDecrementBadgeCount();
        if (detail.notification.data?.id) {
          await fetchListQuote({
            notif: detail.notification.data?.id || null,
          });
          scrollToTopQuote();
        }
      }
    });
    messaging().onNotificationOpenedApp(async remoteMessage => {
      handleDecrementBadgeCount();
      if (remoteMessage?.data?.id) {
        await fetchListQuote({notif: remoteMessage?.data?.id || null});
        scrollToTopQuote();
      }
      if (remoteMessage?.data?.type === 'paywall') {
        handlePayment(remoteMessage?.data?.placement);
      }
    });
  };

  const handleInitialData = async () => {
    if (userProfile.token) {
      await getInitialData(callbackError);
      setCounterNumber(99);
    } else {
      getInitialData(callbackError);
    }
  };

  const handleDidMount = () => {
    try {
      showLoadingModal();
      Purchasely.isReadyToPurchase(true);
      resetNotificationBadge();
      handleNotificationOpened();
      handleInitialData();
      if (activeVersion !== APP_VERSION) {
        handleAppVersion();

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else if (userProfile.token) {
        const fetchUserData = async () => {
          const resProfile = await getUserProfile();
          const res = resProfile.data;

          const remoteMessage = await messaging().getInitialNotification();
          if (remoteMessage?.data?.type === 'paywall') {
            setPaywallObj(remoteMessage.data);
          }
          await handleSelectTheme(res);
          setCounterNumber(99);
          await reloadUserProfile();
          const getInitialURL = await Linking.getInitialURL();
          handleNotificationQuote(res, remoteMessage, getInitialURL);
          handleSubscriptionStatus(res.subscription);
          fetchCollection();
          fetchListLiked();
          fetchPastQuotes();
          setLoading(false);
          handleUpdateTimezone();
          const setting = await getSetting();
          if (setting.data.value !== 'true') {
            handleShowFreePremiumWeekly();
            handleShowFreePremiumDaily();
          }
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
    }
  };

  const purchaselyListener = () => {
    Purchasely.addEventListener(event => {
      console.log('Res addEventListener:', event.name);
    });

    Purchasely.addPurchasedListener(res => {
      // User has successfully purchased a product, reload content
      console.log('User has purchased', res);
    });
  };

  useEffect(() => {
    handleDidMount();
    purchaselyListener();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        resetNotificationBadge();
        handleUpdateTimezone();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    // throw new Error('My first Sentry error!');
    return () => {
      subscription.remove();
      Purchasely.removeEventListener();
    };
  }, []);

  function getInitialRoute() {
    if (userProfile.token) {
      return 'MainPage';
      // return 'NotificationTester';
    }
    if (registerData) {
      return 'Register';
    }
    return 'WelcomePage';
  }
  if (isLoading) return null;
  return (
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
          initialParams={{
            paywallObj,
          }}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="NotificationTester"
          component={NotificationTester}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
