import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

const BookScreen = ({ route, navigation }) => {
  const { flightId } = route.params;
  const [customerName, setCustomerName] = useState('');

  const handleConfirmBooking = () => {
    axios.post('http://localhost:3000/bookings', { flightId, customerName }) 
      .then(response => {
        console.log('Booking confirmed!');
        navigation.navigate('Home'); 
      })
      .catch(error => console.error('Booking failed:', error));
  };

  return (
    <View>
      {/* <Text>Book Flight</Text>
      <Text>Airline: Sample Airline</Text>
      <Text>Departure: Sample Departure</Text>
      <Text>Arrival: Sample Arrival</Text>
      <Text>Price: $100</Text> */}
      <TextInput
        placeholder="Enter your name"
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
      />
      <Button title="Confirm Booking" onPress={handleConfirmBooking} />
    </View>
  );
};



export default BookScreen;
