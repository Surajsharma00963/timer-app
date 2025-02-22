// components/AddButton.js
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';

const AddButton = ({onPress}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: theme.primary}]}
      onPress={onPress}>
      <Icon name="add" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddButton;
