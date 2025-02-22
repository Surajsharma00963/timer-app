import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTimer} from '../context/TimerContext';
import {useTheme} from '../context/ThemeContext';

const HistoryScreen = () => {
  const {state} = useTimer();
  const {theme} = useTheme();

  const renderItem = ({item}) => (
    <View style={[styles.historyItem, {backgroundColor: theme.border}]}>
      <Text style={[styles.historyText, {color: theme.text}]}>{item.name}</Text>
      <Text style={[styles.historyText, {color: theme.text}]}>
        {new Date(item.completedAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: theme.text}]}>History</Text>
      </View>
      {state.history.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: theme.text}]}>
            You dont have any history{' '}
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
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
  historyItem: {
    padding: 16,
    marginVertical: 8,
    // marginHorizontal: 16,
    borderRadius: 8,
  },
  historyText: {
    fontSize: 16,
  },
});

export default HistoryScreen;
