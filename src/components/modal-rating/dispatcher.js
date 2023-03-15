import {changeAskRatingParameter} from '../../store/defaultState/actions';

export default dispatch => ({
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
});
