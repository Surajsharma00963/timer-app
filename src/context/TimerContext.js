// contexts/TimerContext.js
import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer,
        ),
      };

    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? {...timer, status: 'completed'}
            : timer,
        ),
        history: [
          ...state.history,
          {
            ...action.payload,
            completedAt: new Date().toISOString(),
          },
        ],
      };

    // New bulk action cases
    case 'START_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload.category &&
          timer.status !== 'completed'
            ? {...timer, status: 'running'}
            : timer,
        ),
      };

    case 'PAUSE_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload.category &&
          timer.status === 'running'
            ? {...timer, status: 'paused'}
            : timer,
        ),
      };

    case 'RESET_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload.category &&
          timer.status !== 'completed'
            ? {...timer, status: 'stopped', remainingTime: timer.duration}
            : timer,
        ),
      };

    case 'LOAD_DATA':
      return action.payload;

    case 'CLEAR_DATA':
      return {
        ...state,
        history: [],
      };

    default:
      return state;
  }
};

export const TimerProvider = ({children}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [state]);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('timerData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        dispatch({type: 'LOAD_DATA', payload: parsedData});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('timerData', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const clearHistory = async () => {
    dispatch({type: 'CLEAR_DATA'});
    await saveData();
  };
  return (
    <TimerContext.Provider value={{state, dispatch, clearHistory}}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
