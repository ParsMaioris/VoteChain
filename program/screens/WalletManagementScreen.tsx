import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Clipboard,
} from 'react-native';
import {
  generateNewAddress,
  getCurrentAddress,
  getPrivateKey,
} from '../services/WalletService';
import {commonStyles} from '../layout/CommonStyles';

const WalletManagementScreen: React.FC = () => {
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  useEffect(() => {
    const initialAddress = getCurrentAddress();
    setAddress(initialAddress);
  }, []);

  const handleGenerateAddress = () => {
    Alert.alert(
      'Generate New Key',
      'Are you sure you want to generate a new key? Doing so may prevent you from participating in certain referendums with your current address.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const newAddress = generateNewAddress();
            setAddress(newAddress);
            setPrivateKey('');
            setIsKeyVisible(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const toggleViewPrivateKey = () => {
    if (!address) {
      Alert.alert('No Address', 'Please generate an address first.');
      return;
    }
    if (!isKeyVisible) {
      const key = getPrivateKey(address);
      setPrivateKey(key);
    }
    setIsKeyVisible(!isKeyVisible);
  };

  const copyToClipboard = () => {
    Clipboard.setString(privateKey);
    Alert.alert('Copied', 'Private key copied to clipboard.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ethereum Wallet Manager</Text>

      <TouchableOpacity style={styles.button} onPress={handleGenerateAddress}>
        <Text style={styles.buttonText}>Generate New Address</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Current Address:</Text>
        <Text style={styles.infoValue}>{address}</Text>

        <TouchableOpacity style={styles.button} onPress={toggleViewPrivateKey}>
          <Text style={styles.buttonText}>
            {isKeyVisible ? 'Hide' : 'View'} Private Key
          </Text>
        </TouchableOpacity>

        {isKeyVisible && (
          <>
            <Text style={styles.privateKeyValue}>{privateKey}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>Copy Private Key</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 32,
  },
  button: {
    ...commonStyles.button,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoLabel: {
    ...commonStyles.infoLabel,
    marginBottom: 5,
  },
  infoValue: {
    ...commonStyles.infoValue,
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  privateKeyValue: {
    fontSize: 14,
    color: '#616161',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    marginBottom: 10,
  },
  copyButton: {
    ...commonStyles.button,
    backgroundColor: '#FFC107',
  },
  copyButtonText: {
    ...commonStyles.buttonText,
    color: '#212121',
  },
});

export default WalletManagementScreen;
