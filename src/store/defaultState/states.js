import {STORAGE_STATUS} from '../../shared/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_STORAGE_STATUS:
      return {
        ...state,
        storageStatus: action.payload,
      };
    default:
      return state;
  }
};
