import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Screen} from '../../App';
import {getReferendums} from '../data/ReferendumSlice';
import {useDispatch} from '../data/Hooks';

interface HomeScreenProps {
  setCurrentScreen: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({setCurrentScreen}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getReferendums());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Direct Democracy{'\n'}Simplified</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setCurrentScreen(Screen.Referendums)}>
          <Text style={styles.buttonText}>Go to Referendums</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setCurrentScreen(Screen.WalletManagent)}>
        <Text style={styles.buttonText}>Manage Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 18,
  },
});

export default HomeScreen;
