import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const RegisterModal = ({ isOpen, handleRegistration, handleTextButton, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const isFormValid = () => {
    return data.email && data.password && data.name && data.avatar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    handleRegistration(data);
    };

    useEffect(() => {
      setData({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }, [isOpen]);

    return (
      <ModalWithForm
        title="Sign Up"
        buttonText="Sign Up"
        redirectText="Sign In"
        handleTextButton={handleTextButton}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        
  
}