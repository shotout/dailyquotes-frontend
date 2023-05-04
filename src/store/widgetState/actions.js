import store from '../configure-store';
import * as types from './types';

export const changeStandardWidget = payload => {
  store.dispatch({type: types.SET_STANDARD_WIDGET, payload});
};

export const setNewWidget = payload => {
  store.dispatch({type: types.ADD_CUSTOM_WIDGET, payload});
};
export const setRenewWidgetData = payload => {
  store.dispatch({type: types.UPDATE_WIDGET_DATA, payload});
};

export const setWidgetData = payload => {
  store.dispatch({type: types.SET_WIDGET_DATA, payload});
};
