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
    return data.email 
  }
}