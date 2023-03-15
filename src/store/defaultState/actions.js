import FastImage from 'react-native-fast-image';
import {
  getListArea,
  getlistFeel,
  getListWays,
  getListGroup,
  getListTheme,
  getListQuotes,
  getListCollection,
  getListPastQuotes,
  getListLiked,
  getListLink,
} from '../../shared/request';
import {APP_VERSION, BACKEND_URL} from '../../shared/static';
import store from '../configure-store';
import * as types from './types';

export const setModalFirstPremium = payload => ({
  type: types.SET_MODAL_FIRST_PREMIUM,
  payload,
});

export const setModalPremium = payload => ({
  type: types.SET_MODAL_PREMIUM_VISIBILITY,
  payload,
});

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const handleSetProfile = payload => ({
  type: types.SET_PROFILE_DATA,
  payload,
});

export const fetchListQuote = params => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_FETCH_QUOTES});
      const quote = await getListQuotes({
        length: 1000,
        page: 1,
        ...params,
      });
      if (quote.data?.data?.length > 0) {
        dispatch({type: types.SUCCESS_FETCH_QUOTE, payload: quote.data});
      }
      resolve(quote);
    } catch (err) {
      console.log('ERr fetch quote:', err);
      dispatch({type: types.ERROR_FETCH_QUOTES});
      reject(err);
    }
  });

export const fetchCollection = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_FETCH_COLLECTION});
      const collection = await getListCollection();
      dispatch({
        type: types.SUCCESS_FETCH_COLLECTION,
        payload: collection.data,
      });
      resolve(collection);
    } catch (err) {
      console.log('ERr fetch collections:', err);
      dispatch({type: types.ERROR_FETCH_COLLECTION});
      reject(err);
    }
  });

export const fetchPastQuotes = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_PAST_QUOTES});
      const pastQuote = await getListPastQuotes();
      dispatch({
        type: types.SUCCESS_PAST_QUOTES,
        payload: pastQuote.data,
      });
      resolve(pastQuote);
    } catch (err) {
      console.log('ERr fetch past quotes:', err);
      dispatch({type: types.ERROR_PAST_QUOTES});
      reject(err);
    }
  });

export const fetchListLiked = params => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_LIKE_QUOTE});
      const like = await getListLiked(params);
      dispatch({
        type: types.SUCCESS_LIKE_QUOTE,
        payload: like.data,
      });
      resolve(like);
    } catch (err) {
      console.log('ERr fetch past quotes:', err);
      dispatch({type: types.ERROR_LIKE_QUOTE});
      reject(err);
    }
  });

export const getInitialData = callbackError => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const feeling = await getlistFeel();
      const getWay = await getListWays();
      const area = await getListArea();
      const category = await getListGroup();
      const theme = await getListTheme();
      // const link = await getListLink();
      dispatch({
        type: types.SET_DEFAULT_DATA,
        feeling: feeling.data,
        ways: getWay.data,
        areas: area.data,
        categories: category.data,
        themes: theme.data,
        // link: link.data,
      });
      const preloadTheme = [];
      if (category.data?.category?.length > 0) {
        category.data.category.forEach(item => {
          if (item.categories?.length > 0) {
            item.categories.forEach(sub => {
              preloadTheme.push({uri: `${BACKEND_URL}${sub.icon.url}`});
            });
          }
        });
      }
      FastImage.preload(preloadTheme);
      resolve('success');
    } catch (err) {
      if (typeof callbackError === 'function') callbackError();
      console.log('Err fetch data:', err);
      reject(err);
    }
  });

export const handleAppVersion = () => async dispatch => {
  const {activeVersion} = store.getState().defaultState;
  if (activeVersion !== APP_VERSION) {
    dispatch({
      type: types.SET_APP_VERSION,
      payload: APP_VERSION,
    });
  }
};

export const handleEndQuote = () => {
  store.dispatch({type: types.SET_END_REACH_QUOTE});
};

export const setQuoteRef = ref => {
  store.dispatch({type: types.SET_LIST_QUOTE_REF, payload: ref});
};

export const changeAskRatingParameter = () => ({
  type: types.CHANGE_ASK_RATING_PARAMETER,
});

export const changeQuoteLikeStatus = id => {
  store.dispatch({type: types.SET_LIKE_STATUS, payload: id});
};
export const storeRegistrationData = payload => {
  store.dispatch({type: types.SET_REGISTER_STEP, payload});
};

export const showLoadingModal = () => {
  store.dispatch({
    type: types.SHOW_LOADING_MODAL,
  });
};

export const hideLoadingModal = () => {
  store.dispatch({
    type: types.HIDE_LOADING_MODAL,
  });
};

export const setCounterNumber = payload => {
  store.dispatch({
    type: types.CHANGE_COUNTER_LOADING_MODAL,
    payload,
  });
};
