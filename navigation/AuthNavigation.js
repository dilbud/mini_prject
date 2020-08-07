import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
  return (
    <Stack.Navigator
      initialRouteName="login"
      mode="card"
      screenOptions={{
        headerStyle: { backgroundColor: 'papayawhip' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: {
          horizontal: 300,
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen
        name="home01"
        options={{ headerShown: false }}
        component={Home01Screen}
      />
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
