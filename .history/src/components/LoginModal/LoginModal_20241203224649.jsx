import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, handleLogin, handleTextButton, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    return data.email && data.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };