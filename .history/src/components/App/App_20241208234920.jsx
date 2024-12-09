import { Routes, Route, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import Dashboard from '../Dashboard/Dashboard';


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });

  const handleRegistrationClick = () => {
    setActiveModal("signup");
  }

  const handleLoginClick = () => {
    setActiveModal("login");
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  const handleRegistration = ({ email, password, name }) => {
    Register({ email, password, name })
      .then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };
  
  const handleLogin = () => { };
  return (
  <div className="App">
    <Header
      handleLoginClick={handleLoginClick}
    />
    <Routes>
      <Route
        path="/"
        element={
          <Main
            handleRegistrationClick={handleRegistrationClick}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard />
        }
      />
    </Routes>
    <Footer />

    <RegisterModal
      isOpen={activeModal === "signup"}
      onClose={closeActiveModal}
      handleRegistration={handleRegistration}
      handleTextButton={handleLoginClick}
    />

    <LoginModal
      isOpen={activeModal === "login"}
      onClose={closeActiveModal}
      handleLogin={handleLogin}
      handleTextButton={handleRegistrationClick}
    />

  </div>
);
}

export default App;
