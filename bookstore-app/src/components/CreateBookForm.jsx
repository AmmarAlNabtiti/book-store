import React from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CreateBookForm({
  newBook,
  setNewBook,
  isCreating,
  handleCreateBook,
  formErrors,
}) {
  return (
    <Box
      component="form"
      onSubmit={handleCreateBook}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
        width: '100%',
      }}
    >
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        error={!!formErrors.title}
        helperText={formErrors.title}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        error={!!formErrors.author}
        helperText={formErrors.author}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isCreating}
        sx={{ mt: 2 }}
        startIcon={
          isCreating ? <CircularProgress size={24} /> : <AddCircleOutlineIcon />
        }
      >
        {isCreating ? 'Creating...' : 'Create and Add to Cart'}
      </Button>
    </Box>
  );
}

export default CreateBookForm;
