import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Referendum from '../domain/Referendum';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import ReferendumPrompt from './ReferendumPromptScreen';
import LearnMoreScreen from './LearnMoreScreen';

const ReferendumsScreen: React.FC= () => {
  const referendums = useSelector((state: RootState) => state.referendums.referendums);
  const [selectedReferendum, setSelectedReferendum] = useState<Referendum | null>(null);
  const [selectedLearnMore, setSelectedLearnMore] = useState<Referendum | null>(null);

  function resolveReferendum(referendum: Referendum): Referendum {
    const result = referendums.find(element => element.id === referendum.id)
    if (!result) {
      throw new Error('error in ReferendumsScreen.resolveReferendum');
    }
    return result;
  }

  function closeDetailHandler(): void {
    setSelectedReferendum(null);
    setSelectedLearnMore(null);
  }

  if (selectedReferendum) {
    return (
      <ReferendumPrompt 
        referendum={resolveReferendum(selectedReferendum)} 
        onClose={closeDetailHandler} 
      />
    );
  }

  if (selectedLearnMore) {
    return (
      <LearnMoreScreen 
        referendum={resolveReferendum(selectedLearnMore)} 
        onClose={closeDetailHandler} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Referendums</Text>
      <ScrollView style={styles.scrollView}>
        {referendums.map((referendum) => (
          <View key={referendum.id} style={styles.card}>
            <Image source={{ uri: referendum.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{referendum.title}</Text>
            <Text style={styles.description}>{referendum.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedReferendum(referendum)}>
              <Text style={styles.buttonText}>Vote Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => setSelectedLearnMore(referendum)}>
              <Text style={styles.buttonOutlineText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1', 
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: '700', 
    color: '#34495e', 
    paddingVertical: 20,
    textAlign: 'center',
  },
  scrollView: {
    marginBottom: 20, 
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10, 
    padding: 20,
    marginVertical: 10, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: '600', 
    color: '#2c3e50', 
    marginBottom: 8, 
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d', 
    marginBottom: 16, 
  },
  button: {
    backgroundColor: '#3498db', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500', 
  },
  buttonOutline: {
    borderColor: '#3498db', 
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center', 
  },
  buttonOutlineText: {
    fontSize: 16,
    color: '#3498db', 
    fontWeight: '500', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ecc71', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center', 
    marginTop: 10, 
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8, 
  },
});

export default ReferendumsScreen;