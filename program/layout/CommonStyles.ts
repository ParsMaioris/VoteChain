import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
});
