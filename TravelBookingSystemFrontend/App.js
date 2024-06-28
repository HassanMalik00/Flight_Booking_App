import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import BookScreen from './BookScreen';
import BookingsListScreen from './BookingsListScreen';
import ModifyBookingScreen from './ModifyBookingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="BookingsList" component={BookingsListScreen} />
        <Stack.Screen name="ModifyBooking" component={ModifyBookingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
