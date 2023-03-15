import {
  fetchCollection,
  fetchListQuote,
  handleSetProfile,
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetProfile: (...args) => dispatch(handleSetProfile(...args)),
  fetchListQuote: (...args) => dispatch(fetchListQuote(...args)),
  fetchCollection: (...args) => dispatch(fetchCollection(...args)),
});
