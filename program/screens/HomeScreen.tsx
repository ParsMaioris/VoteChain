import React from 'react';
import {View, Text, Image, Button} from 'react-native';
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain',
            marginBottom: 32,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 24,
        }}>
        Direct Democracy, Simplified
      </Text>
      <Button
        title="Go to Referendums"
        onPress={() => setCurrentScreen(Screen.Referendums)}
      />
      <Button
        title="Manage Profile"
        onPress={() => setCurrentScreen(Screen.UserProfile)}
      />
    </View>
  );
};

export default HomeScreen;
