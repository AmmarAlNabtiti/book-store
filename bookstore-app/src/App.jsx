import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header ';
import Books from './components/Books';

function App() {
  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<ProtectedRoute element={Books} />} />
      </Routes>
    </Router>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== '/' ? <Header /> : null;
};

export default App;
