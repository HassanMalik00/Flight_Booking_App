
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
// import { Alert } from 'react-native';

const BookingsListScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const navigation = useNavigation(); 

  useFocusEffect(
    React.useCallback(() => {
      
      console.log("refreshed");
      fetchBookings();
    }, [])
  );

  const fetchBookings = () => {
    axios.get('http://localhost:3000/bookings') 
      .then(response => {
        setBookings(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setBookings([]); 
        setError('Error fetching bookings. Please try again.');
      });
  };

  const handleModifyBooking = (bookingId) => {
    
    navigation.navigate('ModifyBooking', { bookingId });
  };

  const handleDeleteBooking = (bookingId) => {
    console.log('handleDeleteBooking called with bookingId:', bookingId);
  
    
    axios.delete(`http://localhost:3000/bookings/${bookingId}`)
      .then(response => {
        console.log('Booking deleted:', response.data.message);
    
        fetchBookings();
      })
      .catch(deleteError => console.error('Error deleting booking:', deleteError));
  };
  
  

  return (
    <View>
      <Text>Booking Records</Text>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Flight ID: {item.flight_id}</Text>
              <Text>Customer Name: {item.customer_name}</Text>
              <Text>Booking Time: {item.created_at}</Text>
              <Button title="Modify" onPress={() => handleModifyBooking(item.id)} />
              {/* <Button title="Delete" onPress={() => handleDeleteBooking(item.id)} /> */}
              <Button title="Delete" onPress={() => handleDeleteBooking(item.id)} />

              <Text>--------------------</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BookingsListScreen;


  