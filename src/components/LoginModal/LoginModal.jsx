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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    handleLogin(data);
  };

  useEffect(() => {
    setData({
      email: "",
      password: "",
    });
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      redirectText="Sign Up"
      handleTextButton={handleTextButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;