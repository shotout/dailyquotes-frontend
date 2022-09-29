/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../shared/navigationRef';
import navigationData from '../../shared/navigationData';
import WelcomePage from '../welcome-page';
import Register from '../register';

const Stack = createNativeStackNavigator();

function Routes() {
  function getInitialRoute() {
    return 'Register';
    // return 'WelcomePage';
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
