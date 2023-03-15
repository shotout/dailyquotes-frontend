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
    default:
      return {
        ...state,
      };
  }
};
