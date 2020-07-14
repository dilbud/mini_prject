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
// render app
const Stack = createStackNavigator();

export default RootNavigation = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  useEffect(() => {
    setIsLoading(state.isLoading);
    setUserToken(state.userToken);
    console.log(state.isLoading, state.userToken);
  }, [state]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('CAP_101');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } catch (e) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    bootstrapAsync();
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
      {isLoading ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={splash}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : userToken == null ? (
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
