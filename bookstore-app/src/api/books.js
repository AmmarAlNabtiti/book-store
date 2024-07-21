export default class Book {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, method = 'GET', body = null) {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.token}`,
    };

    const config = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  }

  getBooks() {
    return this.request('/books');
  }

  getCart() {
    return this.request('/cart');
  }

  addToCart(book) {
    return this.request('/cart', 'POST', { book });
  }

  removeFromCart(bookId) {
    return this.request(`/cart/${bookId}`, 'DELETE');
  }

  createBook(book) {
    return this.request('/books', 'POST', book);
  }

  submitCart() {
    return this.request('/cart/submit', 'POST');
  }

  getBookById(bookId) {
    return this.request(`/books/${bookId}`);
  }

  updateBook(bookId, book) {
    return this.request(`/books/${bookId}`, 'PUT', book);
  }

  deleteBook(bookId) {
    return this.request(`/books/${bookId}`, 'DELETE');
  }
}
