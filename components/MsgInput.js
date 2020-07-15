import React, { useCallback, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';
export default MsgInput = (props) => {
  const [message, setMessage] = useState('');

  const handlePress = useCallback(
    function () {
      // todo this
    },
    [message]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write you message"
        />
      </View>
      <Icon
        raised
        name="paper-plane"
        type="font-awesome"
        color="#7ed885"
        onPress={() => console.log('hello')}
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
    height: 40,
    borderColor: '#c5c9cc',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
