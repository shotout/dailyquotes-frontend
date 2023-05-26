import Wrap from './axiosWrapper';

export const checkDeviceRegister = (data = {}) =>
  Wrap({
    url: '/auth/check-device',
    method: 'POST',
    data,
  });

export const getlistFeel = () =>
  Wrap({
    url: '/list/feels',
    method: 'get',
  });

export const getUserProfile = () =>
  Wrap({
    url: '/user/profile',
    method: 'get',
  });

export const updateProfile = (data = {}) =>
  Wrap({
    url: '/user/profile',
    method: 'POST',
    data,
  });

export const getListWays = () =>
  Wrap({
    url: '/list/ways',
    method: 'get',
  });

export const getListCategory = () =>
  Wrap({
    url: '/list/categories',
    method: 'get',
  });

export const getListGroup = (params = {}) =>
  Wrap({
    url: '/list/groups',
    method: 'get',
    params,
  });

export const getListArea = (params = {}) =>
  Wrap({
    url: '/list/areas',
    method: 'get',
    params,
  });

export const postRegister = data =>
  Wrap({
    url: '/auth/register',
    method: 'POST',
    data,
  });

export const getListTheme = () =>
  Wrap({
    url: '/list/themes',
    method: 'get',
  });

export const updateCategory = data =>
  Wrap({
    url: '/user/update-category',
    method: 'POST',
    data,
  });

export const unlockByAdmob = (params = {}) =>
  Wrap({
    url: '/admob',
    method: 'GET',
    params,
  });

export const getListQuotes = (params = {}) =>
  Wrap({
    url: '/quote',
    method: 'get',
    params,
  });

export const getNotifQuotes = (params = {}) =>
  Wrap({
    url: '/user/notif',
    method: 'get',
    params,
  });

export const dislikeQuotes = (data, idQuote) =>
  Wrap({
    url: `/user/save-quote/${idQuote}`,
    method: 'POST',
    data,
  });

export const selectTheme = data =>
  Wrap({
    url: `/user/update-theme`,
    method: 'POST',
    data,
  });

export const getListCollection = () =>
  Wrap({
    url: '/user/collection',
    method: 'get',
  });

export const addNewCollection = data =>
  Wrap({
    url: '/user/collection',
    method: 'POST',
    data,
  });

export const addToCollection = ({idCollection, idQuote}) =>
  Wrap({
    url: `/user/add-quote/${idCollection}/${idQuote}`,
    method: 'POST',
  });

export const getMyCollection = (id, params = {}) =>
  Wrap({
    url: `/user/collection/${id}`,
    method: 'get',
    params,
  });

export const renameCollection = (data, idCollection) => {
  Wrap({
    url: `/user/collection/${idCollection}`,
    method: 'POST',
    data,
  });
};

export const removeQuoteCollection = ({idCollection, idQuote}) => {
  Wrap({
    url: `/user/del-quote/${idCollection}/${idQuote}`,
    method: 'POST',
  });
};

export const getListPastQuotes = (params = {}) =>
  Wrap({
    url: `/past-quote`,
    method: 'get',
    params,
  });

export const removePastCollection = ({idQuote}) => {
  Wrap({
    url: `/past-quote/${idQuote}`,
    method: 'DELETE',
  });
};

export const addPastQuotes = idQuote => {
  Wrap({
    url: `/past-quote/${idQuote}`,
    method: 'POST',
  });
};

export const getListLiked = (params = {}) =>
  Wrap({
    url: `/user/like-quote`,
    method: 'get',
    params,
  });

export const removeLikeQuote = idQuote => {
  Wrap({
    url: `/user/like-quote/${idQuote}`,
    method: 'DELETE',
  });
};

export const getRatingStatus = () =>
  Wrap({
    url: '/user/rating',
    method: 'get',
  });

export const giveRating = (data = {}) =>
  Wrap({
    url: '/user/rating',
    method: 'POST',
    data,
  });

export const getListLink = () =>
  Wrap({
    url: '/list/links',
    method: 'get',
  });

export const setSubcription = (data = {}) =>
  Wrap({
    url: '/subscription/update',
    method: 'POST',
    data,
  });

export const deleteUserCollection = (id = null) =>
  Wrap({
    url: `/user/collection/${id}`,
    method: 'DELETE',
  });

export const getSetting = () =>
  Wrap({
    url: `/setting/paywall`,
    method: 'GET',
  });
