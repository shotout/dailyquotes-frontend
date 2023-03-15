import {
  fetchCollection,
  fetchListLiked,
  fetchListQuote,
  fetchPastQuotes,
  getInitialData,
  handleAppVersion,
} from '../../store/defaultState/actions';

export default dispatch => ({
  getInitialData: (...args) => dispatch(getInitialData(...args)),
  fetchListQuote: (...args) => dispatch(fetchListQuote(...args)),
  fetchCollection: (...args) => dispatch(fetchCollection(...args)),
  fetchPastQuotes: (...args) => dispatch(fetchPastQuotes(...args)),
  fetchListLiked: (...args) => dispatch(fetchListLiked(...args)),
  handleAppVersion: (...args) => dispatch(handleAppVersion(...args)),
});
