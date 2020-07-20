import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// react redux
import { useDispatch, useSelector } from 'react-redux';
// navigation imports
import { navigationRef } from '../ExternalRootNavigation';
import UserNavigation from './UserNavigation';
import AuthNavigation from './AuthNavigation';
// action
import { autologin } from '../store/actions/AuthAction';
import auth from '@react-native-firebase/auth';
// render app
const Stack = createStackNavigator();

export default RootNavigation = (props) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [UserToken, setUserToken] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  useEffect(() => {
    setIsLoading(state.isLoading);
    setUserToken(state.userToken);
  }, [state]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        dispatch(autologin(user.uid));
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const splash = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#eceeff',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {IsLoading ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={splash}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : UserToken == null ? (
        <>
          <AuthNavigation />
        </>
      ) : (
        <>
          <UserNavigation />
        </>
      )}
    </NavigationContainer>
  );
};
