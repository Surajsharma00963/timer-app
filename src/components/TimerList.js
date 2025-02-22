// components/TimerList.js
import React from 'react';
import {View} from 'react-native';
import Timer from './Timer';

const TimerList = ({timers, toggleTimer, resetTimer}) => (
  <View>
    {timers.map(timer => (
      <Timer
        key={timer.id}
        timer={timer}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
      />
    ))}
  </View>
);

export default TimerList;
