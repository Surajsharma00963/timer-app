// screens/HomeScreen.js
import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';

import CategoryGroup from '../components/CategoryGroup';
import AddButton from '../components/AddButton';
import {useTimer} from '../context/TimerContext';
import {useTheme} from '../context/ThemeContext';

const HomeScreen = ({navigation}) => {
  const {state} = useTimer();
  const {theme} = useTheme();

  // Filter out completed timers
  const activeTimers = state.timers.filter(
    timer => timer.status !== 'completed',
  );

  // Group only active timers by category
  const groupedTimers = activeTimers.reduce((groups, timer) => {
    const category = timer.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(timer);
    return groups;
  }, {});

  // Don't show empty categories
  const hasActiveTimers = Object.keys(groupedTimers).length > 0;

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: theme.text}]}>My Timers</Text>
      </View>
      {!hasActiveTimers ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: theme.text}]}>
            No active timers. Add a new timer to get started!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {Object.entries(groupedTimers).map(([category, timers]) => (
            <CategoryGroup key={category} category={category} timers={timers} />
          ))}
        </ScrollView>
      )}
      <AddButton onPress={() => navigation.navigate('AddTimer')} />
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
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
