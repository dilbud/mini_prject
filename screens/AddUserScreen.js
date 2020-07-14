import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

export default AddUserScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
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
            title={'Tap to Scan QR'}
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
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <View style={{ width: '50%', marginBottom: 50, alignSelf: 'center' }}>
            <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />
          </View>
        )}
        <View style={{ width: '50%', marginBottom: 50, alignSelf: 'center' }}>
          <Button title={'Go back'} onPress={() => setToggle(true)} />
        </View>
      </View>
    );
  };

  return toggle ? <QrCode /> : <QrScanner />;
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 40,
  },
});
