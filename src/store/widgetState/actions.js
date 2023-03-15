import store from '../configure-store';
import * as types from './types';

export const changeStandardWidget = payload => {
  store.dispatch({type: types.SET_STANDARD_WIDGET, payload});
};
