import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const navigateToBookingsList = () => {
        navigation.navigate('BookingsList');
      };
  const [flights, setFlights] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/flights') 
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  const handleBookPress = (flightId) => {
    navigation.navigate('Book', { flightId });
  };

  return (
    <><View>
      <Text>Flight Search</Text>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.airline} - {item.departure} to {item.arrival} | ${item.price}</Text>
            <Button title="Book Now" onPress={() => handleBookPress(item.id)} />
            {/* <Button title="View Bookings" onPress={navigateToBookingsList} /> */}

          </View>
          // <Button title="View Bookings" onPress={navigateToBookingsList} />
        )} />
      {/* <Button title="View Bookings" onPress={navigateToBookingsList} /> */}
    </View>
    <View>
        <Button title="View Bookings" onPress={navigateToBookingsList} />
      </View></>
  );
};

export default HomeScreen;
