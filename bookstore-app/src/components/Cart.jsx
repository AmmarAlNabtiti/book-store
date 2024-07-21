import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ cart, removeFromCart, submitCart, isSubmitting }) {
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${item.title} x${item.quantity}`}
              secondary={item.author}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeFromCart(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={submitCart}
        disabled={isSubmitting || cart.length === 0} // Disable if submitting or cart is empty
        sx={{ mt: 3, mb: 2 }}
        startIcon={isSubmitting && <CircularProgress size={24} />}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Cart'}
      </Button>
    </>
  );
}

export default Cart;
