import {
  changeAskRatingParameter,
  handleSetProfile,
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetProfile: (...args) => dispatch(handleSetProfile(...args)),
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
});
