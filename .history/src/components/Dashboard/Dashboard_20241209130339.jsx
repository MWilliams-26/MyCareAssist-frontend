import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
import CalendarComponent from "../Calendar/CalendarComponent";
import "./Dashboard.css";

function Dashboard({ handleCreateProfileClick, handleAddDoctorClick, handleAddEmergencyContactClick, handleAddMedicationClick }) {
  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <h1 className="dashboard__header-title">My Care Assist</h1>
        <p className="dashboard__header-greeting">Welcome to your dashboard!</p>
      </section>
      <section className="dashboard__hub">
        <div className="dashboard__hub-container">
          {/* Left Section */}
          <div className="dashboard__hub-profile">
            <h2 className="dashboard__hub-profile-title">Profile</h2>
            <button className="dashboard__hub-profile-btn" >Create Profile +</button>
            <SetupProfile />
          </div>
          {/* Calendar Section */}
          <div className="dashboard__hub-calendar">
            <CalendarComponent />
          </div>
          {/*Right Section */}
          <div className="dashboard__hub-doctor">
            <h2 className="dashboard__hub-doctor-title">Doctors</h2>
            <button className="dashboard__hub-doctor-btn">Add Doctor +</button>
            <DoctorsModal />
          </div>
          {/* Bottom Left */}
          <div className="dashboard__hub-emergency">
            <h2 className="dashboard__hub-emergency-title">Emergency Contacts</h2>
            <button className="dashboard__hub-emergency-btn">Add Emergency Contact +</button>
            <EmergencyContacts />
          </div>
          {/* Bottom Right */}
          <div className="dashboard__hub-medication">
            <h2 className="dashboard__hub-medication-title">Medication</h2>
            <button className="dashboard__hub-medication-btn">Add Medication +</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

