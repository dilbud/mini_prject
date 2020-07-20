import React, { useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Avatar, Text } from 'react-native-elements';
import { HeaderBackButton } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { signout } from '../store/actions/AuthAction';

export default ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  const prop = () => {
    if (auth().currentUser.photoURL) {
      return {
        source: {
          uri: auth().currentUser.photoURL,
        },
        title: auth().currentUser.displayName[0].toUpperCase(),
      };
    } else {
      return {
        title: auth().currentUser.displayName[0].toUpperCase(),
      };
    }
  };

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
              backfaceVisibility: 'hidden',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {}}
          >
            <Icon name="user-edit" color="#88888800" type="font-awesome-5" />
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
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate('home', {
              refresh: false,
            });
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Avatar backgroundColor="#c3c3c3" rounded size="xlarge" {...prop()} />
      <Text
        style={{ marginTop: 20, alignItems: 'center', textAlign: 'center' }}
        h1
      >
        {auth().currentUser.displayName}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
});
