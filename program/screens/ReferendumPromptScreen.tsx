import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Referendum from '../domain/Referendum';
import BackArrowHeader from '../layout/BackArrowHeader';
import {useDispatch} from '../data/Hooks';
import {castVote} from '../data/ReferendumSlice';

interface ReferendumPromptProps {
  referendum: Referendum;
  onClose: () => void;
}

const ReferendumPrompt: React.FC<ReferendumPromptProps> = ({
  referendum,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleVote = (referendum: Referendum, vote: 'yes' | 'no') => {
    dispatch(castVote({referendum, vote}));
  };

  return (
    <View style={{flex: 1}}>
      <BackArrowHeader onBackPress={onClose} text="Referendums" />
      <View style={styles.container}>
        <Text style={{...styles.title, marginTop: 20}}>{referendum.title}</Text>
        <Text>{referendum.description}</Text>

        {referendum.userHasVoted ? (
          <Text style={styles.voteResult}>
            You voted: {referendum.userVote}
          </Text>
        ) : (
          <View style={styles.voteSection}>
            <TouchableOpacity
              onPress={() => handleVote(referendum, 'yes')}
              style={styles.voteButton}>
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVote(referendum, 'no')}
              style={styles.voteButton}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  voteSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  voteButton: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  voteResult: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ReferendumPrompt;
