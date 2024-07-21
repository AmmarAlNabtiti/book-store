import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

const submitCartUrl = 'http://localhost:3000/api/cart/submit';

function SubmitCart() {
  const submitCart = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(submitCartUrl, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      alert('Cart submitted successfully');
    } else {
      alert('Failed to submit cart');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Submit Cart
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={submitCart}
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Cart
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SubmitCart;
