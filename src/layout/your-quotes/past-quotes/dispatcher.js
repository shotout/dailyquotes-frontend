import {fetchPastQuotes} from '../../../store/defaultState/actions';

export default dispatch => ({
  fetchPastQuotes: (...args) => dispatch(fetchPastQuotes(...args)),
});
