import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Screen} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavigationBar: React.FC<{
  setCurrentScreen: (screen: Screen) => void;
}> = ({setCurrentScreen}) => {
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={() => setCurrentScreen(Screen.Home)}>
        <Icon name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen(Screen.Referendums)}>
        <Icon name="list-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen(Screen.WalletManagent)}>
        <Icon name="person-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default BottomNavigationBar;
