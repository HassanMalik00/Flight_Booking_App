const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
//   password: 'your-mysql-password',
  database: 'travel_booking',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Fetch flights endpoint
app.get('/flights', (req, res) => {
  // Retrieve flights from the database
  const selectQuery = 'SELECT * FROM flights';
  connection.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching flights:', error);
      res.status(500).json({ message: 'Error fetching flights. Please try again.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Bookings endpoint
app.post('/bookings', (req, res) => {
  const { flightId, customerName } = req.body;

  // Insert booking details into the database
  const insertQuery = 'INSERT INTO bookings (flight_id, customer_name) VALUES (?, ?)';
  connection.query(insertQuery, [flightId, customerName], (error, results) => {
    if (error) {
      console.error('Error inserting booking:', error);
      res.status(500).json({ message: 'Booking failed. Please try again.' });
    } else {
      console.log('Booking inserted:', results);
      res.status(200).json({ message: 'Booking confirmed successfully!' });
    }
  });
});
app.get('/bookings', (req, res) => {
    const selectBookingsQuery = 'SELECT * FROM bookings';
    connection.query(selectBookingsQuery, (error, results) => {
      if (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings. Please try again.' });
      } else {
        res.status(200).json(results);
      }
    });
  });
 
  app.put('/bookings/:bookingId', (req, res) => {
    const { bookingId } = req.params;
    const updatedBookingDetails = req.body;
  
    // Check if the provided flight_id exists in the flights table
    const flightCheckQuery = 'SELECT * FROM flights WHERE id = ?';
  
    connection.query(flightCheckQuery, [updatedBookingDetails.flight_id], (checkError, checkResults) => {
      if (checkError || checkResults.length === 0) {
        // Handle the case where the flight_id does not exist in the flights table
        console.error('Invalid flight_id:', updatedBookingDetails.flight_id);
        res.status(400).json({ message: 'Invalid flight_id. Please provide a valid flight_id.' });
      } else {
        // Valid flight_id, proceed with the update
        const { flight_id, customer_name } = updatedBookingDetails;
  
        const updateQuery = 'UPDATE bookings SET flight_id = ?, customer_name = ? WHERE id = ?';
  
        connection.query(updateQuery, [flight_id, customer_name, bookingId], (updateError, results) => {
          if (updateError) {
            console.error('Error updating booking:', updateError);
            res.status(500).json({ message: 'Unable to update booking. Please try again.' });
          } else {
            console.log('Booking updated:', results);
            res.status(200).json({ message: 'Booking updated successfully!' });
          }
        });
      }
    });
  });
  
  
  
  // app.delete('/bookings/:bookingId', (req, res) => {
  //   const { bookingId } = req.params;
  
  //   const deleteQuery = 'DELETE FROM bookings WHERE id = ?';
  //   connection.query(deleteQuery, [bookingId], (error, results) => {
  //     if (error) {
  //       console.error('Error deleting booking:', error);
  //       res.status(500).json({ message: 'Booking deletion failed. Please try again.' });
  //     } else {
  //       console.log('Booking deleted:', results);
  //       res.status(200).json({ message: 'Booking deleted successfully!' });
  //     }
  //   });
  // });
  app.delete('/bookings/:bookingId', (req, res) => {
    const { bookingId } = req.params;
  
    const deleteQuery = 'DELETE FROM bookings WHERE id = ?';
    connection.query(deleteQuery, [bookingId], (error, results) => {
      if (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Booking deletion failed. Please try again.' });
      } else if (results.affectedRows === 0) {
        // Check if no rows were affected (booking not found)
        res.status(404).json({ message: 'Booking not found.' });
      } else {
        console.log('Booking deleted:', results);
        res.status(200).json({ message: 'Booking deleted successfully!' });
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
