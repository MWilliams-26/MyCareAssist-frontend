import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import Dashboard from '../Dashboard/Dashboard';
import SetupProfile from '../SetupProfileModal/SetupProfileModal';
import DoctorsModal from '../DoctorsModal/DoctorsModal';
import EmergencyContacts from '../EmergencyContactsModal/EmergencyContacts';
import { Register, Login } from '../../utils/auth';
import { createProfile, getProfile, addDoctor } from '../../utils/api';


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [doctors, setDoctors] = useState(
    activeDoctor: null,
    doctorList: []
  );
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    _id: "",
  });

  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    setActiveModal("signup");
  }

  const handleLoginClick = () => {
    setActiveModal("login");
  }

  const handleCreateProfileClick = () => {
    setActiveModal("setupProfile");
  }

  const handleAddDoctorClick = () => {
    setActiveModal("addDoctor");
  }

  const handleAddEmergencyContactClick = () => {
    setActiveModal("addEmergencyContact");
  }

  const handleAddMedicationClick = () => {
    setActiveModal("addMedication");
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

  const handleLogin = (data) => {
    console.log("Login data:", { email, password });
    Login(data)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser({
          email: userData.email,
          name: userData.name,
          _id: userData.id
        });
        closeActiveModal();
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      email: "",
      name: "",
      avatar: "",
      _id: "",
    });
    navigate("/");
  };
  const handleCreateProfile = (data) => {
    createProfile(data)
      .then((profile) => {
        setProfileData(profile);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile) {
          SetupProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const handleAddDoctor = (data) => {
    addDoctor(data)
      .then((new) => {
        setDoctors(updatedDoctors);
        console.log("Doctor added successfully:", updatedDoctors);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
      });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const existingDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
        setDoctors(existingDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (isLoggedIn) {
      fetchDoctors();
    }
  }, [isLoggedIn]);

  const handleAddEmergencyContact = () => { };
  const handleAddMedication = () => { };


  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard
                profileData={profileData}
                doctors={doctors}
                handleCreateProfile={handleCreateProfile}
                handleCreateProfileClick={handleCreateProfileClick}
                handleAddDoctorClick={handleAddDoctorClick}
                handleAddEmergencyContactClick={handleAddEmergencyContactClick}
                handleAddMedicationClick={handleAddMedicationClick}
              />
            </ProtectedRoute>
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

      <SetupProfile
        isOpen={activeModal === "setupProfile"}
        onClose={closeActiveModal}
        createProfile={handleCreateProfile}
      />

      <DoctorsModal
        isOpen={activeModal === "addDoctor"}
        onClose={closeActiveModal}
        addDoctor={handleAddDoctor}
      />

    </div>
  );
}

export default App;
