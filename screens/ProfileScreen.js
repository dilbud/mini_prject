import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

import { signout } from '../store/actions/AuthAction';

export default ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  useEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#dffff0',
      },
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 30,
            width: 160,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {}}
          >
            <Icon name="user-edit" color="#888888" type="font-awesome-5" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#83ffc5',
              marginRight: 0,
              borderRadius: 50,
            }}
            onPress={() => {
              dispatch(signout());
            }}
          >
            <Text>{'SIGNOUT'}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: 'red' }}>
        <Text>Home Screen</Text>
      </View>
      <Button title="Go to User" onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
