import {createSelector} from 'reselect';
import store from '../configure-store';
import {sizing} from '../../shared/styling';
import {isUserPremium} from '../../helpers/user';

const authorizationSelector = state => state.defaultState;

export const userCredentialSelector = createSelector(
  authorizationSelector,
  defaultState => defaultState.userProfile,
);

export const scrollToTopQuote = () => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  const getIndex = isUserPremium() ? 0 : 6;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({
      animated: false,
      offset: sizing.getDimensionHeight(getIndex),
    });
  }
};

export const scrollToFifthQuote = () => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  const {restPassLength} = store.getState().defaultState;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({
      animated: false,
      offset: sizing.getDimensionHeight(8),
    });
  }
};

export const scrollToIndexQuote = index => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({
      animated: false,
      offset: sizing.getDimensionHeight(index || 0),
    });
  }
};

export const scrollAnimatedContent = index => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({
      animated: true,
      offset: sizing.getDimensionHeight(index || 0),
    });
  }
};
