import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LocalizeProvider} from 'react-localize-redux';
import {LogBox} from 'react-native';
import Navigator from './screens/app-routes';
import store, {persistor} from './store/configure-store';
import {networkDebugger} from './shared/networkDebugger';

LogBox.ignoreAllLogs();

const App = () => {
  const getData = async () => {};

  useEffect(() => {
    networkDebugger();
    getData();
  }, []);

  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </LocalizeProvider>
    </Provider>
  );
};

export default App;
