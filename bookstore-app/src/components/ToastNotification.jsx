import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = ({ position = 'bottom-left', autoClose = 1000 }) => {
  return <ToastContainer position={position} autoClose={autoClose} />;
};

export default ToastNotification;
