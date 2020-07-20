import React from 'react';
import { View, Alert } from 'react-native';

export default (title, msg) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};
