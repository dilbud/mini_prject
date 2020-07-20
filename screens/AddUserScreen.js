import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { HeaderBackButton } from '@react-navigation/stack';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';

export default AddUserScreen = ({ navigation, route }) => {
  const [HasPermission, setHasPermission] = useState(null);
  const [Scanned, setScanned] = useState(false);
  const [Toggle, setToggle] = useState(true);
  const [Data, setData] = useState(auth().currentUser.uid);
  const [Input, setInput] = useState('');

  useEffect(() => {
    if (Input !== '') {
      // add user
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then((v) => {
          if (
            v.get('rooms').filter((val) => {
              if (val.user === Input) return true;
              else return false;
            }).length === 0
          ) {
            const room = firestore().collection('rooms').doc().id;
            // update current user
            firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .update({
                rooms: firestore.FieldValue.arrayUnion({ user: Input, room }),
              })
              .then((v) => {})
              .catch((e) => {});
            // update other user
            firestore()
              .collection('users')
              .doc(Input)
              .update({
                rooms: firestore.FieldValue.arrayUnion({
                  user: auth().currentUser.uid,
                  room,
                }),
              })
              .then((v) => {})
              .catch((e) => {});
          }
        })
        .catch((e) => {});
    }
  }, [Input]);

  useEffect(() => {
    navigation.setOptions({
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
    navigation.setOptions({
      title: 'Add Friends',
      headerStyle: {
        backgroundColor: '#dffff0',
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (!Toggle) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [Toggle]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type === 256) {
      setScanned(true);
      setInput(data);
    } else {
      setScanned(false);
    }
  };

  const QrCode = () => {
    return (
      <View style={styles.MainContainer}>
        <View>
          <QRCode
            value={Data}
            size={300}
            color="black"
            backgroundColor="transparent"
          />
        </View>
        <View
          style={{
            width: '50%',
            marginTop: 30,
            alignSelf: 'center',
            height: 30,
          }}
        >
          <Button
            buttonStyle={{ borderRadius: 20 }}
            containerViewStyle={{
              width: '100%',
              marginLeft: 0,
              marginRight: 0,
            }}
            title="Tap to Scan QR"
            onPress={() => {
              setToggle(false);
            }}
          />
        </View>
      </View>
    );
  };

  const QrScanner = () => {
    if (HasPermission === null || HasPermission === false) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ width: '50%', marginBottom: 50, alignSelf: 'center' }}>
            <Button
              buttonStyle={{ borderRadius: 20 }}
              containerViewStyle={{
                width: '100%',
                marginLeft: 0,
                marginRight: 0,
              }}
              title="Go Back"
              onPress={() => {
                setToggle(true);
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={Scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {Scanned && (
          <View style={{ width: '50%', marginBottom: 50, alignSelf: 'center' }}>
            <Button
              buttonStyle={{ borderRadius: 20 }}
              containerViewStyle={{
                width: '100%',
                marginLeft: 0,
                marginRight: 0,
              }}
              title="Scan Again"
              onPress={() => {
                setScanned(false);
              }}
            />
          </View>
        )}
        <View style={{ width: '50%', marginBottom: 50, alignSelf: 'center' }}>
          <Button
            buttonStyle={{ borderRadius: 20 }}
            containerViewStyle={{
              width: '100%',
              marginLeft: 0,
              marginRight: 0,
            }}
            title="Go Back"
            onPress={() => {
              setToggle(true);
            }}
          />
        </View>
      </View>
    );
  };

  return Toggle ? <QrCode /> : <QrScanner />;
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 40,
  },
});
