import configStore from './combineReducer';

const {store, persistor} = configStore();

export {persistor};

export default store;
