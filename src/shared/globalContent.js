import store from '../store/configure-store';
import {
  setModalFirstPremium,
  setModalPremium,
} from '../store/defaultState/actions';

export const handleModalFirstPremium = (status = false) => {
  store.dispatch(setModalFirstPremium(status === true));
};

export const showModalPremium = () => {
  store.dispatch(setModalPremium(true));
};

export const hideModalPremium = () => {
  store.dispatch(setModalPremium(false));
};
