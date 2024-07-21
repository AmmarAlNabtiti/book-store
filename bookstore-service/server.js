const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Dummy data for demonstration
const users = [
  {
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('password1', 8), // Pre-hash the password
  },
  {
    id: 2,
    username: 'user2',
    password: bcrypt.hashSync('password2', 8), // Pre-hash the password
  },
];

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
];

const cart = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(500).send({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ token: null, message: 'Invalid Password' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).send({ token });
});

// Route to get list of books
app.get('/api/books', authenticateToken, (req, res) => {
  res.status(200).send(books);
});

// Route to create a new book
app.post('/api/books', authenticateToken, (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).send({ message: 'Title and author are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).send({ message: 'Book created successfully', book: newBook });
});

// Route to add books to cart
app.post('/api/cart', authenticateToken, (req, res) => {
  const { book } = req.body;

  if (!book || !book.id) {
    return res.status(400).send({ message: 'Invalid book data' });
  }

  const bookExists = books.find((b) => b.id === book.id);
  if (!bookExists) {
    return res.status(404).send({ message: 'Book not found' });
  }

  const cartItem = cart.find((c) => c.id === book.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  res.status(201).send({ message: 'Book added to cart', cart });
});

// Route to get the cart
app.get('/api/cart', authenticateToken, (req, res) => {
  res.status(200).send(cart);
});

// Route to remove a book from the cart
app.delete('/api/cart/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = cart.findIndex((c) => c.id === parseInt(id));

  if (index !== -1) {
    cart.splice(index, 1);
    res.status(200).send({ message: 'Book removed from cart', cart });
  } else {
    res.status(404).send({ message: 'Book not found in cart' });
  }
});

// Route to submit the cart
app.post('/api/cart/submit', authenticateToken, (req, res) => {
  cart.length = 0; // Clear the cart after submission
  res.status(200).send({ message: 'Cart submitted successfully' });
});

// Route to verify token
app.get('/api/verify-token', authenticateToken, (req, res) => {
  res.status(200).send({ message: 'Token is valid' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
