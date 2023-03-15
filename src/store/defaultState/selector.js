import {createSelector} from 'reselect';
import store from '../configure-store';

const authorizationSelector = state => state.defaultState;

export const userCredentialSelector = createSelector(
  authorizationSelector,
  defaultState => defaultState.userProfile,
);

export const scrollToTopQuote = () => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({animated: true, offset: 0});
  }
};
