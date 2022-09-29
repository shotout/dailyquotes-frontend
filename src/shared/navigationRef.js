import React from 'react';
import {
  StackActions,
  CommonActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};
export const goBack = () => {
  navigationRef.current?.goBack();
};

export const push = (...args) => {
  navigationRef.current?.dispatch(StackActions.push(...args));
};

export const replace = (...args) => {
  navigationRef.current?.dispatch(StackActions.replace(...args));
};

export const reset = (name, params) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );
};

export const pop = (...args) => {
  navigationRef.current?.dispatch(StackActions.pop(...args));
};

export const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

export const jumpTo = (...args) => {
  reset('Dashboard');
  setTimeout(() => {
    navigationRef.current?.dispatch(TabActions.jumpTo(...args));
  }, 300);
};

export const innerJump = (...args) => {
  navigationRef.current?.dispatch(TabActions.jumpTo(...args));
};

// export const getCurrentRoute = (...args) => navigationRef.current?.getCurrentRoute();

// export const jumpHandler = (tabName = '', extraParams = {}) => {
//   const tabNames = ['Home', 'Market', 'Trade', 'Order', 'More'];
//   const currentRoute = getCurrentRoute();
//   if (tabNames.includes(currentRoute.name)) {
//     innerJump(tabName, extraParams);
//   } else {
//     jumpTo(tabName, extraParams);
//   }
// };
