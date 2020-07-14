import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddUserScreen from '../screens/AddUserScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="add" component={AddUserScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
