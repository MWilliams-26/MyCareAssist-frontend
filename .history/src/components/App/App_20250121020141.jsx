import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import About from '../About/About';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import Dashboard from '../Dashboard/Dashboard';
import SetupProfile from '../SetupProfileModal/SetupProfileModal';
import DoctorsModal from '../DoctorsModal/DoctorsModal';
import EmergencyContacts from '../EmergencyContactsModal/EmergencyContacts';
import { mockDoctors } from '../../utils/constants';
import MedicationModal from '../MedicationModal/MedicationModal';

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [doctors, setDoctors] = useState({
    activeDoctor: null,
    doctorsList: [],
  });
  const [emergencyContacts, setEmergencyContacts] = useState({
    activeContact: null,
    contactsList: [],
  });
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    _id: "",
  });

  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    setActiveModal("signup");
  }

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
    setIsLoggedIn(true);
    setCurrentUser({
      email: email,
      name: name,
      _id: "user-123"
    });
    closeActiveModal();
    navigate("/dashboard");
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setCurrentUser({
      email: data.email,
      name: "Demo User",
      _id: "user-123"
    });
    closeActiveModal();
    navigate('/dashboard');
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
    setProfileData(data);
    closeActiveModal();
  };

  const handleAddDoctor = (data) => {
    const newDoctor = {
      _id: Date.now().toString(),
      ...data
    };

    setDoctors(prevState => ({
      activeDoctor: prevState.doctorsList.length === 0 ? newDoctor : prevState.activeDoctor,
      doctorsList: [...prevState.doctorsList, newDoctor]
    }));

    closeActiveModal();
  };

  const handleDoctorSelect = (doctorId) => {
    const selectedDoctor = doctors.doctorsList.find(doc => doc._id === doctorId);
    setDoctors((prevState) => ({
      ...prevState,
      activeDoctor: selectedDoctor
    }));
  };

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

  const handleAddEmergencyContact = (contactData) => {
    const newContact = {
      _id: Date.now().toString(),
      ...contactData
    };

    setEmergencyContacts(prevState => ({
      activeContact: prevState.contactsList.length === 0 ? newContact : prevState.activeContact,
      contactsList: [...prevState.contactsList, newContact]
    }));

    localStorage.setItem('emergencyContacts', JSON.stringify([
      ...emergencyContacts.contactsList,
      newContact
    ]));
    closeActiveModal();
  };

  const handleEmergencyContactSelect = (contactId) => {
    const selectedContact = emergencyContacts.contactsList.find(contact => contact._id === contactId);
    setEmergencyContacts((prevState) => ({
      ...prevState,
      activeContact: selectedContact
    }));
  };

  useEffect(() => {
    const fetchEmergencyContacts = () => {
      const storedContacts = localStorage.getItem('emergencyContacts');
      const existingContacts = storedContacts ? JSON.parse(storedContacts) : [];

      setEmergencyContacts({
        activeContact: existingContacts.length > 0 ? existingContacts[0] : null,
        contactsList: existingContacts
      });
    };

    if (isLoggedIn) {
      fetchEmergencyContacts();
    }
  }, [isLoggedIn]);

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
          path="/about"
          element={
            <About handleGetStartedClick={handleGetStartedClick} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard
                profileData={profileData}
                doctors={doctors}
                emergencyContacts={emergencyContacts}
                handleDoctorSelect={handleDoctorSelect}
                handleEmergencyContactSelect={handleEmergencyContactSelect}
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
        profile={profileData}
        isOpen={activeModal === "setupProfile"}
        onClose={closeActiveModal}
        createProfile={handleCreateProfile}
      />

      <DoctorsModal
        isOpen={activeModal === "addDoctor"}
        onClose={closeActiveModal}
        addDoctor={handleAddDoctor}
      />

      <EmergencyContacts
        isOpen={activeModal === "addEmergencyContact"}
        onClose={closeActiveModal}
        addEmergencyContact={handleAddEmergencyContact}
      />

      <MedicationModal
        isOpen={activeModal === "addMedication"}
        onClose={closeActiveModal}
        addMedication={handleAddMedication}
      />
    </div>
  );
}

export default App;