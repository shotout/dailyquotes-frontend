import {fetchListLiked} from '../../../store/defaultState/actions';

export default dispatch => ({
  fetchListLiked: (...args) => dispatch(fetchListLiked(...args)),
});
