import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from '@mui/material';

function BookList({ books, addToCart, loadingBookId }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {books.map((book) => (
        <ListItem key={book.id}>
          <ListItemText primary={book.title} secondary={book.author} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(book)}
            disabled={loadingBookId === book.id}
          >
            {loadingBookId === book.id ? (
              <CircularProgress size={24} />
            ) : (
              'Add to Cart'
            )}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

export default BookList;
