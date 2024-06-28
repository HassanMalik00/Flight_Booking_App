import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ModifyBookingScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [bookingDetails, setBookingDetails] = useState({
    flight_id: '',
    customer_name: '',
    // Add other fields as needed
  });

  // useEffect(() => {
  //   // Fetch the details of the booking with the given bookingId
  //   fetchBookingDetails();
  // }, [bookingId]);

  // const fetchBookingDetails = () => {
  //   axios.get(`http://localhost:3000/bookings/${bookingId}`)
  //     .then(response => {
  //       setBookingDetails(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching booking details:', error);
  //       Alert.alert('Error', 'Unable to fetch booking details. Please try again.');
  //     });
  // };
  
  const handleUpdateBooking = () => {
    
    axios.put(`http://localhost:3000/bookings/${bookingId}`, {
      flight_id: bookingDetails.flight_id,
      customer_name: bookingDetails.customer_name,
    
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Booking updated:', response.data);
        Alert.alert('Success', 'Booking updated successfully!');
      
        navigation.navigate('BookingsList');
      })
      .catch(updateError => {
        console.error('Error updating booking:', updateError);
        Alert.alert('Error', 'Unable to update booking. Please try again.');
      });
  };
  

  return (
    <View>
      <Text>Modify Booking</Text>
      <TextInput
        placeholder="Flight ID"
        value={bookingDetails.flight_id}
        onChangeText={(text) => setBookingDetails({ ...bookingDetails, flight_id: text })}
      />
      <TextInput
        placeholder="Customer Name"
        value={bookingDetails.customer_name}
        onChangeText={(text) => setBookingDetails({ ...bookingDetails, customer_name: text })}
      />
      
      <Button title="Update Booking" onPress={handleUpdateBooking} />
    </View>
  );
};

export default ModifyBookingScreen;
