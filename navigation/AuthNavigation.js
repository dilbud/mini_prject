import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const Home01Screen = () => {
  return (
    <View style={styles.container}>
      <Text h1>17000122</Text>
      <Text h1>Buddika HGD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: '10%',
    paddingBottom: 20,
  },
});

export default AuthNavigation = (props) => {
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
      <Stack.Screen
        name="Splash"
        component={splash}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
