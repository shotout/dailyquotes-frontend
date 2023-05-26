import moment from 'moment';
import {createUniqueID} from '../../helpers/user';
import {STORAGE_STATUS} from '../../shared/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  userProfile: {},
  defaultData: {
    feeling: [],
    ways: [],
    areas: [],
    categories: {},
    themes: [],
    link: {},
  },
  quotes: {
    listData: [],
    currentPage: 1,
    isLoading: false,
    totalQuotes: null,
  },
  collections: [],
  showModalPremium: false,
  pastQuoteList: [],
  listLikedQuote: {},
  dataCollection: {},
  activeVersion: null,
  modalFirstPremium: false,
  listQuoteRef: null,
  haveBeenAskRating: null,
  registerData: null,
  loadingModal: {
    visible: false,
    counter: 0,
  },
  todayAdsLimit: 12,
  listBasicQuote: [],
  restPassLength: 0,
  runAnimationSlide: false,
  finishInitialLoader: false,
  paywallNotifcation: null,
  animationCounter: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ANIMATION_COUNTER:
      return {
        ...state,
        animationCounter: action.payload,
      };
    case types.SET_PAYWALL_NOTIFICATION:
      return {
        ...state,
        paywallNotifcation: action.payload,
      };
    case types.SET_INITIAL_FINISH_LOADER:
      return {
        ...state,
        finishInitialLoader: action.payload,
      };
    case types.SET_ANIMATION_SLIDE_DATA:
      return {
        ...state,
        runAnimationSlide: action.payload,
      };
    case types.SET_TODAY_ADS_LIMIT:
      return {
        ...state,
        todayAdsLimit: 12,
        restPassLength: 0,
      };
    case types.SHOW_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          visible: true,
          counter: 0,
        },
      };
    case types.CHANGE_COUNTER_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          counter: action.payload,
        },
      };
    case types.HIDE_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          visible: false,
        },
      };
    case types.SET_REGISTER_STEP: {
      return {
        ...state,
        registerData: {
          ...action.payload,
        },
      };
    }
    case types.SET_LIST_QUOTE_REF:
      return {
        ...state,
        listQuoteRef: action.payload,
      };
    case types.SET_END_REACH_QUOTE:
      const additionalData = state.quotes.listData.map(item => ({
        ...item,
        id: createUniqueID(),
      }));
      return {
        ...state,
        quotes: {
          ...state.quotes,
          listData: [...state.quotes.listData, ...additionalData],
        },
      };
    case types.SET_MODAL_FIRST_PREMIUM:
      return {
        ...state,
        modalFirstPremium: action.payload,
      };
    case types.SET_APP_VERSION:
      return {
        ...state,
        userProfile: {},
        listLikedQuote: {
          listDataLike: [],
        },
        collections: [],
        quotes: {
          listData: [],
          currentPage: 1,
          isLoading: false,
        },
        activeVersion: action.payload,
      };
    case types.SET_MODAL_PREMIUM_VISIBILITY:
      return {
        ...state,
        showModalPremium: action.payload,
      };
    case types.START_FETCH_COLLECTION:
      return {
        ...state,
      };
    case types.SUCCESS_FETCH_COLLECTION:
      return {
        ...state,
        collections: action.payload,
      };
    case types.ERROR_FETCH_COLLECTION:
      return {
        ...state,
      };
    case types.START_FETCH_QUOTES:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          currentPage: 1,
          isLoading: true,
        },
      };
    case types.SET_NEW_QUOTE_DATA:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          listData: action.payload,
        },
      };
    case types.SUCCESS_FETCH_QUOTE:
      return {
        ...state,
        restPassLength: action.restPassLength,
        todayAdsLimit:
          action.isPassPremium || state.todayAdsLimit > 17
            ? 99
            : 12 + action.restPassLength,
        quotes: {
          listData: action.arrData,
          currentPage: 1,
          isLoading: false,
          totalQuotes: action.payload.total,
        },
        listBasicQuote: action.listBasicQuote,
      };
    case types.ERROR_FETCH_QUOTES:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          isLoading: false,
        },
      };
    case types.START_PAST_QUOTES:
      return {
        ...state,
      };
    case types.SUCCESS_PAST_QUOTES:
      return {
        ...state,
        pastQuoteList: action.payload,
      };
    case types.ERROR_PAST_QUOTES:
      return {
        ...state,
      };
    case types.START_LIKE_QUOTE:
      return {
        ...state,
      };
    case types.SUCCESS_LIKE_QUOTE:
      return {
        ...state,
        listLikedQuote: action.payload,
      };
    case types.ERROR_LIKE_QUOTE:
      return {
        ...state,
      };
    case types.SET_DEFAULT_DATA:
      return {
        ...state,
        defaultData: {
          feeling: action.feeling,
          ways: action.ways,
          areas: action.areas,
          categories: action.categories,
          themes: action.themes,
          link: action.link,
        },
      };
    case types.SET_PROFILE_DATA:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.SET_STORAGE_STATUS:
      return {
        ...state,
        storageStatus: action.payload,
      };

    case types.CHANGE_ASK_RATING_PARAMETER:
      return {
        ...state,
        haveBeenAskRating: moment().format('YYYY-MM-DD'),
      };
    case types.SET_LIKE_STATUS:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          listData: state.quotes.listData.map(item => {
            if (item.id === action.payload) {
              let isLiked = false;
              if (!item.like) {
                isLiked = false;
              }
              if (item.like) {
                if (item.like?.type) {
                  if (item.like?.type === '1' || item.like?.type === 1) {
                    isLiked = true;
                  }
                }
              }
              return {
                ...item,
                like: {
                  ...item.like,
                  flag: isLiked ? 'dislike' : 'like',
                  type: isLiked ? 2 : 1,
                },
              };
            }
            return item;
          }),
        },
      };
    default:
      return state;
  }
};
