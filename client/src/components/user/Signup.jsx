import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import AppContext from '../../context/AppContext';

function Signup() {
  const { register } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rememberMe: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    const result = await register(name, email, password);
    if (result.success) {
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        
        }}
      >
      {/* Brand Logo */}
<Box sx={{ marginBottom: 3 }}>
  <img
    src="data:image/jpeg;base64,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"
    alt="logo"
          className='ms-5'
            width="60%"
            height="auto"
  />
</Box>

<Typography variant="h5" gutterBottom>
          Signup
        </Typography>
        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
           
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
    
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Toast Container */}
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default Signup;
