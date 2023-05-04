import * as types from './types';

const INITIAL_STATE = {
  listCustomWidget: [],
  standardWidget: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_STANDARD_WIDGET:
      return {
        ...state,
        standardWidget: action.payload,
      };
    case types.SET_WIDGET_DATA:
      return {
        ...state,
        listCustomWidget: action.payload,
      };
    case types.ADD_CUSTOM_WIDGET:
      const addTheme = [...state.listCustomWidget];
      addTheme.push(action.payload);
      return {
        ...state,
        listCustomWidget: addTheme,
      };
    case types.UPDATE_WIDGET_DATA:
      return {
        ...state,
        listCustomWidget: state.listCustomWidget.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    default:
      return {
        ...state,
      };
  }
};
