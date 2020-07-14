import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default AuthNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="signup"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};
