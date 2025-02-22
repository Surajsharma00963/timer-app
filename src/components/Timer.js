// components/Timer.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import styles from '../../styles';

const Timer = ({timer, toggleTimer, resetTimer}) => (
  <View style={styles.timerContainer}>
    <Text style={styles.timerText}>
      {timer.name} - {timer.time}s (
      {timer.completed ? 'Completed' : timer.running ? 'Running' : 'Paused'})
    </Text>
    <Progress.Bar
      progress={timer.time / timer.duration}
      width={200}
      color="blue"
      style={styles.progressBar}
    />
    <TouchableOpacity onPress={() => toggleTimer(timer.id)}>
      <Text style={styles.button}>{timer.running ? 'Pause' : 'Start'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => resetTimer(timer.id)}>
      <Text style={styles.button}>Reset</Text>
    </TouchableOpacity>
  </View>
);

export default Timer;
