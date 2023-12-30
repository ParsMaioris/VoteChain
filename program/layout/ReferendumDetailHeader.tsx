import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const BackArrowHeader: React.FC<{ onBackPress: () => void, text: string }> = ({ onBackPress, text }) => {
  return (
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Icon name="chevron-back-outline" size={20} color="#007AFF" />
      <Text style={styles.backButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 8, 
  },
  backButtonText: {
    color: '#007AFF', 
    fontSize: 18, 
    marginLeft: 4, 
  },
});

export default BackArrowHeader;