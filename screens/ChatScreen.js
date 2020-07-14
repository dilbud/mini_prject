import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import Msg from '../components/Msg';
import MsgInput from '../components/MsgInput';

export default ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const availableMeals = useSelector((state) => state);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);

  const mock = [
    { id: 1, message: 'Hello', side: 'left' },
    { id: 2, message: 'Hi!', side: 'right' },
    { id: 3, message: 'Hello', side: 'left' },
    { id: 4, message: 'Hi!', side: 'right' },
    { id: 5, message: 'Hello', side: 'left' },
    { id: 6, message: 'Hi!', side: 'right' },
    { id: 7, message: 'Hello', side: 'left' },
    { id: 8, message: 'Hi!', side: 'right' },
    { id: 9, message: 'Hello', side: 'left' },
    { id: 10, message: 'Hi!', side: 'right' },
    { id: 11, message: 'Hello', side: 'left' },
    { id: 12, message: 'Hi!', side: 'right' },
    { id: 13, message: 'Hello', side: 'left' },
    { id: 14, message: 'Hi!', side: 'right' },
    { id: 15, message: 'Hello', side: 'left' },
    { id: 16, message: 'vvvvvvvvvvvvvvvvvv', side: 'right' },
  ];
  return (
    <>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={mock}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={function ({ item }) {
            return <Msg side={item.side} message={item.message} />;
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <MsgInput />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    height: '100%',
    paddingBottom: 60,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderTopColor: '#737373',
  },
});
