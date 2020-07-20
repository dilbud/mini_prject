import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default HomeScreen = ({ navigation, route }) => {
  const [List, setList] = useState([]);

  const fetchData = async () => {
    try {
      const v = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      const list = v.get('rooms').map((value, i) => {
        return firestore()
          .collection('users')
          .doc(value.user)
          .get()
          .then((val) => {
            return {
              name: val.data().name,
              avatar_url: val.data().avatar_url ? val.data().avatar_url : null,
              room: value.room,
              uId: value.user,
            };
          });
      });
      Promise.all(list)
        .then((val) => {
          setList(val);
        })
        .catch((e) => {
          setList([]);
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (route.params?.refresh) {
      fetchData();
    }
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

    navigation.setOptions({
      title: 'CAP',
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
            width: 100,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('add');
            }}
          >
            <Icon name="plus" type="font-awesome" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('profile');
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
  }, [navigation, route.params]);

  const renderItem = ({ item }) => {
    const prop = () => {
      if (item.avatar_url) {
        return {
          leftAvatar: {
            containerStyle: { backgroundColor: '#c1c1c1' },
            source: {
              uri: item.avatar_url,
            },
            title: item.name[0].toUpperCase(),
          },
        };
      } else {
        return {
          leftAvatar: {
            containerStyle: { backgroundColor: '#c1c1c1' },
            title: item.name[0].toUpperCase(),
          },
        };
      }
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('chat', {
            name: item.name,
            proPic: item.avatar_url,
            uId: item.uId,
            room: item.room,
          })
        }
      >
        <ListItem title={item.name} {...prop()} bottomDivider chevron />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={List}
      renderItem={renderItem}
    />
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
