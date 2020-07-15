import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

export default AddUserScreen = ({ navigation }) => {
  const [HasPermission, setHasPermission] = useState(null);
  const [Scanned, setScanned] = useState(false);
  const [Toggle, setToggle] = useState(true);
  const [Data, setData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Add Friends',
      headerStyle: {
        backgroundColor: '#dffff0',
      },
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };

  if (HasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (HasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const QrCode = () => {
    return (
      <View style={styles.MainContainer}>
        <View>
          <QRCode
            value={'jfhutydrtdjtydty6545446'}
            size={250}
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
