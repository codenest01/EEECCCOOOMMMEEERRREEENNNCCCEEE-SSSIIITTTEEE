import React, { useContext, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Address() {
  const { shippingadress, useraddress } = useContext(AppContext);

  // State to hold form values
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

    // Call the shipping address function
    await shippingadress(fullName, address, city, state, country, pincode, phoneNumber);

    // Clear the form after submission
    setFormData({
      fullName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNumber: ''
    });
  };

  return (
    <Container maxWidth="sm" style={{marginTop:"100px"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Shipping Address
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fullName"
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="city"
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="state"
              label="State"
              variant="outlined"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="country"
              label="Country"
              variant="outlined"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="pincode"
              label="Pincode"
              variant="outlined"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Show "Use Old Address" button only if useraddress exists */}
      {useraddress && (
        <Box textAlign="center" mt={3}>
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="warning">
              Use Old Address
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}

export default Address;
