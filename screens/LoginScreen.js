import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../store/actions/AuthAction';
import alert from './AlertScreen';

export default LoginScreen = ({ navigation }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ToggleSecure, setToggleSecure] = useState(true); // is secure
  const [ToggleEye, setToggleEye] = useState('eye-slash');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);

  useEffect(() => {
    ToggleSecure ? setToggleEye('eye-slash') : setToggleEye('eye');
  }, [ToggleSecure]);

  const send = () => {
    if (Email === '' || Password === '') {
      alert('Form', 'Empty details');
      setPassword('');
      return;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(Email) === false) {
      alert('Email', 'Email is Not Correct');
      setPassword('');
      return;
    }
    if (Password.length < 6) {
      alert('Password', 'Password least 6 character');
      setPassword('');
      return;
    }
    dispatch(signin(Email, Password));
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.titleText}>
        Welcome to CAP
      </Text>
      <Input
        value={Email}
        placeholder="email@address.com"
        label="Email"
        leftIcon={<Icon name="envelope" size={24} color="#818181" />}
        onChangeText={setEmail}
      />
      <Input
        value={Password}
        placeholder="Password"
        label="Password"
        leftIcon={<Icon name="lock" size={24} color="#818181" />}
        rightIcon={
          <Icon
            name={ToggleEye}
            size={24}
            color="#818181"
            onPress={() => {
              setToggleSecure(!ToggleSecure);
            }}
          />
        }
        onChangeText={setPassword}
        secureTextEntry={ToggleSecure}
      />
      <View style={styles.login}>
        <Button
          buttonStyle={{ borderRadius: 20 }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          title="LOGIN"
          onPress={() => {
            send();
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
