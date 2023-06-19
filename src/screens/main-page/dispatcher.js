import {
  changeAskRatingParameter,
  fetchListQuote,
  handleSetProfile,
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetProfile: (...args) => dispatch(handleSetProfile(...args)),
  fetchListQuote: (...args) => dispatch(fetchListQuote(...args)),
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
});
