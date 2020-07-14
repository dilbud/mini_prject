import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../store/actions/AuthAction';

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.titleText}>
        Welcome to CAP
      </Text>
      <Input
        placeholder="email@address.com"
        label="Email"
        leftIcon={<Icon name="envelope" size={24} color="#818181" />}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        label="Password"
        leftIcon={<Icon name="lock" size={24} color="#818181" />}
        onChangeText={setPassword}
      />
      <View style={styles.login}>
        <Button
          buttonStyle={{ borderRadius: 20 }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          title="LOGIN"
          onPress={() => {
            dispatch(signin(email, password));
          }}
        />
      </View>
      <View style={styles.join}>
        <Button
          containerViewStyle={{ marginTop: 20 }}
          buttonStyle={styles.join}
          type="clear"
          title="New user? Join here"
          onPress={() => {
            navigation.navigate('signup');
          }}
        />
      </View>
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
  titleText: {
    marginBottom: 20,
  },
  login: {
    width: '40%',
    marginBottom: 10,
  },
  join: {
    borderRadius: 20,
  },
});
