import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import Dashboard from '../Dashboard/Dashboard';
import { Register, Login } from '../../utils/auth';


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });

  const navigate = useNavigate();

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
    console.log("Registration data:", { email, password, name });
    Register({ email, password, name })
      .then((data) => {
        console.log("Registration successful:", data);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    console.log("Login data:", { email, password });
    Login({ email, password })
      .then((data) => {
        console.log("Login successful:", data);
        setIsLoggedIn(true);
        setCurrentUser(data);
        closeActiveModal();
        navigate("/dashboard");
      };


    return (
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
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
