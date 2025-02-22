// components/CategoryGroup.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TimerCard from './TimerCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTimer} from '../context/TimerContext';
import {useTheme} from '../context/ThemeContext';

const CategoryGroup = ({category, timers}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {theme} = useTheme();
  const {dispatch} = useTimer();

  const handleBulkAction = actionType => {
    dispatch({
      type: actionType,
      payload: {category},
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, {backgroundColor: theme.primary}]}
        onPress={() => setIsExpanded(!isExpanded)}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{category}</Text>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.bulkActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction('START_ALL')}>
            <Icon name="play" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Start All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction('PAUSE_ALL')}>
            <Icon name="pause" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Pause All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction('RESET_ALL')}>
            <Icon name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Reset All</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.timerList}>
          {timers.map(timer => (
            <TimerCard key={timer.id} timer={timer} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    padding: 16,
    borderRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 4,
  },
  timerList: {
    marginTop: 8,
  },
});

export default CategoryGroup;
