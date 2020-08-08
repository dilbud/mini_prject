import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default MsgInput = (props) => {
  const [Message, setMessage] = useState('');

  const setMsg = useCallback(() => {
    if (Message !== '') {
      const msg = Message;
      setMessage('');
      database()
        .ref(`/rooms/${props.room}/msgs`)
        .push(
          {
            uid: auth().currentUser.uid,
            time: database().getServerTime().getTime(),
            msg,
          },
          () => {}
        );
    }
  }, [Message]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          scrollEnabled={true}
          multiline={true}
          style={styles.input}
          value={Message}
          onChangeText={(val) => {
            setMessage(val);
          }}
          placeholder="Write you message"
        />
      </View>
      <Icon
        raised
        name="paper-plane"
        type="font-awesome"
        color="#7ed885"
        onPress={() => {
          setMsg();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    width: '70%',
  },
  input: {
    maxHeight: Dimensions.get('window').height / 4,
    borderColor: '#c5c9cc',
    color: '#3f3f3f',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    fontSize: 15,
    paddingHorizontal: 15,
  },
});
