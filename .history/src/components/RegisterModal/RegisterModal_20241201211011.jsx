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
      <label className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="email"
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
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required

        />
      </label>
      <label className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required

        />
      </label>
      <label className="modal__label">
        Avatar{""}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar"
          value={data.avatar || ""}
          onChange={handleChange}
          required

        />
      </label>
    </ModalWithForm>
  )

};

export default REgisterModal;