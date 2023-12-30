import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import HomeScreen from './program/screens/HomeScreen';
import ReferendumsScreen from './program/screens/ReferendumScreen';
import WalletManagementScreen from './program/screens/WalletManagementScreen';
import {Provider} from 'react-redux';
import {store} from './program/data/Store';
import BottomNavigationBar from './program/screens/common/BottomNavigationBar';

export enum Screen {
  Home,
  Referendums,
  WalletManagent,
  LearnMoreScreen,
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);

  let screenComponent;

  switch (currentScreen) {
    case Screen.Home:
      screenComponent = <HomeScreen setCurrentScreen={setCurrentScreen} />;
      break;
    case Screen.Referendums:
      screenComponent = <ReferendumsScreen />;
      break;
    case Screen.WalletManagent:
      screenComponent = <WalletManagementScreen />;
      break;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenContainer}>{screenComponent}</View>
        <BottomNavigationBar setCurrentScreen={setCurrentScreen} />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default App;
