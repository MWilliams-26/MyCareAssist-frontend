import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../

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

  const handleRegistration = (data) => {
    console.log(data);
    setIsLoggedIn(true);
    setCurrentUser(data);
  }


  return (
    <div className="App">
      <Header
        handleRegistrationClick={handleRegistrationClick}
        handleLoginClick={handleLoginClick}
      />
      {/* <Main></Main>
      <Footer></Footer> */}

      <RegisterModal
        isOpen={activeModal === "signup"}
        onClose={closeActiveModal}
        handleRegistration={handleRegistration}
        handleTextButton={handleLoginClick}
      />
      

    </div>
  );
}

export default App;
