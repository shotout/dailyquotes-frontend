import {fetchCollection} from '../../../store/defaultState/actions';

export default dispatch => ({
  fetchCollection: (...args) => dispatch(fetchCollection(...args)),
});
