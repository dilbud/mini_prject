import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import Msg from '../components/Msg';
import MsgInput from '../components/MsgInput';
import { Avatar } from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default ChatScreen = ({ navigation, route }) => {
  const [mock, setmock] = useState([]);
  const [MsgCount, setMsgCount] = useState(0);
  const [IsLoading, setIsLoading] = useState(true);
  const [OnetimeCall, setOnetimeCall] = useState(false);
  const [NewElement, setNewElement] = useState([]);
  const [IsFirstCalled, setIsFirstCalled] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const [FirstTimeRefresh, setFirstTimeRefresh] = useState(false);
  const [InitialVal, setInitialVal] = useState(-1);
  const [counter, setcounter] = useState(0);
  const [AutoHeight, setAutoHeight] = useState(90);

  useEffect(() => {
    database()
      .ref(`/rooms/${route.params.room}/msgs`)
      .orderByChild('time')
      .limitToLast(15)
      .once('value')
      .then((snapshot) => {
        setMsgCount(snapshot.numChildren());
        const listMain = [];
        snapshot.forEach((v) => {
          listMain.push({
            key: v.key,
            id: v.toJSON().time,
            message: v.toJSON().msg,
            side: auth().currentUser.uid === v.toJSON().uid ? 'right' : 'left',
          });
        });
        return listMain;
      })
      .then((v) => {
        setIsLoading(false);
        setFirstTimeRefresh(true);
        setRefresh(true);
        setmock(v.reverse());
        setInitialVal(0.1);
        setOnetimeCall(true);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (NewElement.length !== 0) {
      if (IsFirstCalled) {
        setmock([...NewElement, ...mock]);
        setRefresh(false);
      } else {
        if (mock.length === 0) {
          setmock([...NewElement, ...mock]);
        }
        setIsFirstCalled(true);
      }
    }
  }, [NewElement]);

  useEffect(() => {
    let onValueChange = null;
    if (OnetimeCall) {
      onValueChange = database()
        .ref(`/rooms/${route.params.room}/msgs`)
        .orderByChild('time')
        .limitToLast(1)
        .on('child_added', (snapshot) => {
          const oneEle = [];
          oneEle.push({
            key: snapshot.key,
            id: snapshot.val().time,
            message: snapshot.val().msg,
            side:
              auth().currentUser.uid === snapshot.val().uid ? 'right' : 'left',
          });
          setNewElement(oneEle);
        });
    }

    return () => {
      if (onValueChange) {
        database()
          .ref(`/rooms/${route.params.room}/msgs`)
          .off('child_added', onValueChange);
      }
    };
  }, [OnetimeCall]);

  const getNewData = useCallback(() => {
    if (mock.length >= 15) {
      setcounter(counter + 1);
      if (FirstTimeRefresh) {
        setIsLoading(true);
        getLast20();
      } else {
      }
    }
  }, [FirstTimeRefresh, counter, mock]);

  const getLast20 = useCallback(() => {
    const newMsgCount = MsgCount + 10;
    database()
      .ref(`/rooms/${route.params.room}/msgs`)
      .orderByChild('time')
      .limitToLast(newMsgCount)
      .once('value')
      .then((snapshot) => {
        setMsgCount(snapshot.numChildren());
        const listMain = [];
        snapshot.forEach((v) => {
          listMain.push({
            key: v.key,
            id: v.toJSON().time,
            message: v.toJSON().msg,
            side: auth().currentUser.uid === v.toJSON().uid ? 'right' : 'left',
          });
        });
        return listMain;
      })
      .then((v) => {
        setIsLoading(false);
        setFirstTimeRefresh(true);
        setRefresh(true);
        setmock(v.reverse());
        setInitialVal(0.1);
      })
      .catch((e) => {});
  }, [MsgCount]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Add Friends',
      headerStyle: {
        backgroundColor: '#dffff0',
      },
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate('home', {
              refresh: true,
            });
          }}
        />
      ),
    });
  }, [navigation]);

  // profile pic
  useEffect(() => {
    const prop = () => {
      if (route.params.proPic) {
        return {
          source: {
            uri: route.params.proPic,
          },
          title: route.params.name[0].toUpperCase(),
        };
      } else {
        return {
          title: route.params.name[0].toUpperCase(),
        };
      }
    };
    navigation.setOptions({
      title: route.params.name,
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 30,
            width: 40,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              {...prop()}
              containerStyle={{ backgroundColor: '#c1c1c1' }}
              rounded
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ backgroundColor: '#dfe2e5' }}>
      <View style={[styles.messagesContainer, { paddingBottom: AutoHeight }]}>
        {IsLoading ? (
          <View
            style={{
              backgroundColor: 'transparent',
              zIndex: 1,
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 50,
              height: 50,
              transform: [{ translateX: -25 }],
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <FlatList
          inverted
          style={{ backgroundColor: '#dfe2e5' }}
          onEndReached={() => {
            getNewData();
          }}
          refreshing={Refresh}
          onEndReachedThreshold={InitialVal}
          initialNumToRender={MsgCount}
          data={mock}
          extraData={mock}
          keyExtractor={(item) => {
            return item.key.toString();
          }}
          renderItem={function ({ item }) {
            return (
              <Msg side={item.side} message={item.message} time={item.id} />
            );
          }}
        />
      </View>

      <View
        style={styles.inputContainer}
        onLayout={(event) => {
          setAutoHeight(+event.nativeEvent.layout.height.toFixed(0));
        }}
      >
        <MsgInput {...route.params} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    height: '100%',
  },
  inputContainer: {
    width: '100%',
    minHeight: 90,
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#dfdfdf',
  },
});
