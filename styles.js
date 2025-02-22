// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  timerContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  timerText: {
    fontSize: 18,
    marginBottom: 5,
  },
  progressBar: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

