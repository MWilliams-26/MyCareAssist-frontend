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
import { use } from 'react';


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [doctors, setDoctors] = useState({
    activeDoctor: null,
    doctorsList: [],
  });
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
      .then((newDoctor) => {
        setDoctors(prevState => ({
          activeDoctor: prevState.doctorsList.length === 0 ? newDoctor : prevState.activeDoctor,
          doctorsList: [...prevState.doctorsList, newDoctor]
        }));
        console.log("Doctor added successfully");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
      });
  };

  const handleDoctorSelect = (doctorId) => {
    console.log("Selected doctor ID:", doctorId);
    console.log("Current doctors state:", doctors);
    if (!doctorId) {
      setDoctors(prev => ({ ...prev, activeDoctor: null }));
      return;
    }
    const selectedDoctor = doctors.doctorsList.find(doc => doc._id === doctorId);
    if (!selectedDoctor) {
      console.error("Selected doctor not found");
      return;
    }

    setDoctors(prevState => {
      const newState = {
        ...prevState,
        activeDoctor: selectedDoctor
      };
      return newState;
    });
  }

  useEffect(() => {
    const fetchDoctors = () => {
      const storedDoctors = localStorage.getItem('doctors');
      const existingDoctors = storedDoctors ? JSON.parse(storedDoctors) : mockDoctors;

      setDoctors({
        activeDoctor: existingDoctors.length > 0 ? existingDoctors[0] : null,
        doctorsList: existingDoctors
      });
    };

    if (isLoggedIn) {
      fetchDoctors();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (doctors.doctorsList.length > 0) {
      localStorage.setItem('doctors', JSON.stringify(doctors.doctorsList));
    }
  }, [doctors.doctorsList]);

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
                handleDoctorSelect={handleDoctorSelect}
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
