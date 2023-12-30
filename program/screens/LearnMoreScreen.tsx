import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Referendum from '../domain/Referendum'; 
import BackArrowHeader from '../layout/ReferendumDetailHeader'; 

interface LearnMoreProps {
  referendum: Referendum;
  onClose: () => void;
}

const LearnMoreScreen: React.FC<LearnMoreProps> = ({ referendum, onClose }) => {
  return (
    <View style={{ flex: 1 }}>
      <BackArrowHeader onBackPress={onClose} text={"Referendums"}/>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{referendum.title}</Text>
        <Text style={styles.description}>{referendum.details}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
  },
});

export default LearnMoreScreen;
