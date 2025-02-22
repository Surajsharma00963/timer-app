import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {useTimer} from '../context/TimerContext';

const TimerCard = ({timer}) => {
  const {theme} = useTheme();
  const {dispatch} = useTimer();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer.status === 'running') {
      intervalRef.current = setInterval(() => {
        if (timer.remainingTime <= 0) {
          clearInterval(intervalRef.current);
          dispatch({
            type: 'COMPLETE_TIMER',
            payload: {
              ...timer,
              completedAt: new Date().toISOString(),
            },
          });
          // Show completion modal
          dispatch({
            type: 'SHOW_COMPLETION_MODAL',
            payload: {
              timerName: timer.name,
            },
          });
        } else {
          dispatch({
            type: 'UPDATE_TIMER',
            payload: {
              ...timer,
              remainingTime: timer.remainingTime - 1,
            },
          });
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.status, timer.remainingTime]);

  // Don't render if completed
  if (timer.status === 'completed') {
    return null;
  }

  const progress = (timer.remainingTime / timer.duration) * 100;

  const handleStart = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {...timer, status: 'running'},
    });
  };

  const handlePause = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {...timer, status: 'paused'},
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {
        ...timer,
        status: 'stopped',
        remainingTime: timer.duration,
      },
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.border}]}>
      <Text style={[styles.name, {color: theme.text}]}>{timer.name}</Text>
      <Text style={[styles.time, {color: theme.text}]}>
        {Math.floor(timer.remainingTime / 60)}:
        {(timer.remainingTime % 60).toString().padStart(2, '0')}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.primary,
              width: `${progress}%`,
            },
          ]}
        />
      </View>
      <View style={styles.controls}>
        {timer.status !== 'running' && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.primary}]}
            onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {timer.status === 'running' && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.secondary}]}
            onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.primary}]}
          onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 24,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default TimerCard;
