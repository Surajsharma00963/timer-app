// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Clock, History, Settings} from 'lucide-react-native';
import AddTimerScreen from './src/Screens/AddTimerScreen';
import HistoryScreen from './src/Screens/HistoryScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import HomeScreen from './src/Screens/HomeScreen';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {TimerProvider} from './src/context/TimerContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigator for Home tab to handle the AddTimer screen
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TimersList" component={HomeScreen} />
      <Stack.Screen name="AddTimer" component={AddTimerScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="timer-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TimerProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </TimerProvider>
    </ThemeProvider>
  );
};

export default App;
