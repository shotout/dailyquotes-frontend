/* eslint-disable import/extensions */
import {handleSetProfile} from '../../../store/defaultState/actions';

export default dispatch => ({
  handleSetProfile: (...args) => dispatch(handleSetProfile(...args)),
});
