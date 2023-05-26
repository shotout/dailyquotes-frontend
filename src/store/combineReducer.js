import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {localizeReducer} from 'react-localize-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import defaultState from './defaultState/states';
import widgetState from './widgetState/states';
import {setStorageStatus} from './defaultState/actions';
import {SET_STORAGE_STATUS} from './defaultState/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const commonPersistConfig = {
  key: 'defaultState',
  storage: AsyncStorage,
  whitelist: [
    'userProfile',
    'defaultData',
    'activeVersion',
    'haveBeenAskRating',
    'quotes',
    'registerData',
    'todayAdsLimit',
    'restPassLength',
  ],
  blacklist: [
    'showModalPremium',
    'finishInitialLoader',
    'runAnimationSlide',
    'paywallNotifcation',
    'animationCounter',
  ],
};
const widgetPersistConfig = {
  key: 'widgetState',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  defaultState: persistReducer(commonPersistConfig, defaultState),
  widgetState: persistReducer(widgetPersistConfig, widgetState),
  localize: localizeReducer,
});

const pReducers = persistReducer(persistConfig, rootReducers);

export default () => {
  const store = createStore(
    pReducers,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  );
  const persistor = persistStore(store, undefined, () => {
    store.dispatch(setStorageStatus(SET_STORAGE_STATUS.rehydrated));
  });
  return {store, persistor};
};
