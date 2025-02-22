import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTimer} from '../context/TimerContext';
import {useTheme} from '../context/ThemeContext';

const AddTimerScreen = ({navigation}) => {
  const {dispatch} = useTimer();
  const {theme} = useTheme();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      category,
      status: 'stopped',
      remainingTime: parseInt(duration, 10),
    };

    dispatch({type: 'ADD_TIMER', payload: newTimer});
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: theme.text}]}>
          Add new Timer
        </Text>
      </View>
      <TextInput
        style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={theme.text}
      />
      <TextInput
        style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholderTextColor={theme.text}
      />
      <TextInput
        style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={theme.text}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primary}]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    // padding: 16,
    paddingBottom: 20,
    paddingTop: 40, // Add padding for status bar
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AddTimerScreen;
