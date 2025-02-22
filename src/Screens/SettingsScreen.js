import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useTimer} from '../context/TimerContext';

const SettingsScreen = () => {
  const {theme, isDark, setIsDark} = useTheme();
  const {clearHistory} = useTimer(); // Get clearHistory function
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmClear = () => {
    clearHistory();
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: theme.text}]}>Settings</Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={[styles.settingItem, {borderBottomColor: theme.border}]}>
        <Text style={[styles.settingText, {color: theme.text}]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          trackColor={{false: '#767577', true: theme.primary}}
          thumbColor={isDark ? theme.secondary : '#f4f3f4'}
        />
      </View>

      {/* Clear History Button */}
      <View style={[styles.settingItem, {borderBottomColor: theme.border}]}>
        <Text style={[styles.settingText, {color: theme.text}]}>
          Clear History
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Icon name="trash-bin-outline" size={30} color={theme.text} />
        </Pressable>
      </View>

      {/* Modal for confirmation */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, {backgroundColor: theme.background}]}>
            <Text style={[styles.modalText, {color: theme.text}]}>
              Are you sure you want to delete all history?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: theme.primary}]}
                onPress={handleConfirmClear}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: theme.secondary}]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
