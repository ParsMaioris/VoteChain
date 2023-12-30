import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UserProfileScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>User Profile</Text>
    <Text style={styles.userInfo}>Username: JaneDoe</Text>
    <Text style={styles.userInfo}>Email: janedoe@example.com</Text>
    
    <Button title="Edit Profile" onPress={() => {/* Logic for editing profile */}} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfileScreen;