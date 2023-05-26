import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LocalizeProvider} from 'react-localize-redux';
import {LogBox, Platform, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import Purchasely, {RunningMode} from 'react-native-purchasely';
import {Adjust, AdjustConfig} from 'react-native-adjust';
import FullScreenChz from 'react-native-fullscreen-chz';

import * as Sentry from '@sentry/react-native';
import Navigator from './screens/app-routes';
import store, {persistor} from './store/configure-store';
import {networkDebugger} from './shared/networkDebugger';
import ModalLock from './layout/main-page/modal-lock';
import ModalFirstPremium from './components/modal-first-premium';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://3e765c1b1c404989ace20873bc1dac63@o4504973387300864.ingest.sentry.io/4504973397786624',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

LogBox.ignoreAllLogs();

Purchasely.startWithAPIKey(
  'e179f325-e556-4b4e-8b2e-5c0b0e1cfa6d',
  ['Google'],
  null,
  Purchasely.logLevelDebug,
  RunningMode.FULL,
);

const App = () => {
  const configTracker = () => {
    const adjustConfig = new AdjustConfig(
      'rkrky0am4phc',
      // AdjustConfig.EnvironmentSandbox,
      AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
    console.log('Finish set configtracker');
  };

  useEffect(() => {
    networkDebugger();
    configTracker();
    if (Platform.OS === 'android') {
      FullScreenChz.enable();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Provider store={store}>
        <LocalizeProvider store={store}>
          <PersistGate persistor={persistor}>
            <PaperProvider>
              <Navigator />
              <ModalLock />
              <ModalFirstPremium />
              {/* <ModalLoadingInitial /> */}
            </PaperProvider>
          </PersistGate>
        </LocalizeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Sentry.wrap(App);
