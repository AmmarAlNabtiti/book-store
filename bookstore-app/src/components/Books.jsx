import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import BookList from './BookList';
import Cart from './Cart';
import CreateBookForm from './CreateBookForm';
import Book from '../api/books';
import { delay } from '../utils/delay';
import ToastNotification from './ToastNotification';
import { toast } from 'react-toastify';

const bookApi = new Book(process.env.REACT_APP_BASE_URL);

function Books() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [formErrors, setFormErrors] = useState({ title: '', author: '' });
  const [loadingBookId, setLoadingBookId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const booksData = await bookApi.getBooks();
        setBooks(booksData);
        const cartData = await bookApi.getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Failed to fetch data:', error.message);
        toast.error('Failed to fetch data');
      }
    }

    fetchData();
  }, []);

  const addToCart = async (book) => {
    setLoadingBookId(book.id);
    try {
      await delay(2000);
      await bookApi.addToCart(book);
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === book.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...book, quantity: 1 }];
        }
      });
      toast.success('Book added to cart!');
    } catch (error) {
      console.error('Failed to add book to cart:', error.message);
      toast.error('Failed to add book to cart');
    } finally {
      setLoadingBookId(null); // Reset loading state
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await bookApi.removeFromCart(bookId);
      setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
      toast.success('Book removed from cart!');
    } catch (error) {
      console.error('Failed to remove book from cart:', error.message);
      toast.error('Failed to remove book from cart');
    }
  };

  const submitCart = async () => {
    setIsSubmitting(true);
    try {
      await delay(2000); // Adding delay for demonstration
      await bookApi.submitCart();
      setCart([]);
      toast.success('Cart submitted successfully');
    } catch (error) {
      console.error('Failed to submit cart:', error.message);
      toast.error('Failed to submit cart');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const { title, author } = newBook;

    // Validate form inputs
    let errors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!author.trim()) errors.author = 'Author is required';
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsCreating(true);
    try {
      await delay(2000); // Adding delay for demonstration
      const createdBook = await bookApi.createBook(newBook);
      setBooks((prevBooks) => [...prevBooks, createdBook]);
      setNewBook({ title: '', author: '' });
      toast.success('Book created successfully!');
    } catch (error) {
      console.error('Failed to create book:', error.message);
      toast.error('Failed to create book');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <ToastNotification />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3, mt: 8 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Available Books
              </Typography>
              <BookList
                books={books}
                addToCart={addToCart}
                loadingBookId={loadingBookId}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, mt: 8 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Cart
              </Typography>
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                submitCart={submitCart}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                Create New Book
              </Typography>
              <CreateBookForm
                newBook={newBook}
                setNewBook={setNewBook}
                isCreating={isCreating}
                handleCreateBook={handleCreateBook}
                formErrors={formErrors}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Books;
