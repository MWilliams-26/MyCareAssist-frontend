import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, handleLogin, handleTextButton, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  