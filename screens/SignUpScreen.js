import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text h4 style={styles.titleText}>
        Join with CAP
      </Text>
      <Input
        placeholder="email@address.com"
        label="Email"
        leftIcon={<Icon name="envelope" size={24} color="#818181" />}
      />
      <Input
        placeholder="Password"
        label="Password"
        leftIcon={<Icon name="lock" size={24} color="#818181" />}
      />
      <View style={styles.login}>
        <Button
          buttonStyle={{ borderRadius: 20 }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          title="SIGNUP"
          onPress={() => {}}
        />
      </View>
      <View style={styles.join}>
        <Button
          containerViewStyle={{ marginTop: 20 }}
          buttonStyle={styles.join}
          type="clear"
          title="Or login Now"
          onPress={() => {
            navigation.navigate('login');
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
