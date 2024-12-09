import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
import CalendarComponent from "../Calendar/CalendarComponent";
import "./Dashboard.css";

function Dashboard({ }) {
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
            <button className="dashboard__hub-profile-btn">Create Profile</button>
            <SetupProfile />SETUP PROFILE
          </div>
          {/* Calendar Section */}
          <div className="dashboard__hub-calendar">
            <CalendarComponent />
          </div>
          {/*Right Section */}
          <div className="dashboard__hub-doctor">
            <button className="dashboard__hub-doctor-btn">Add Doctor</button>
            <DoctorsModal />DOCTORS
          </div>
          {/* Bottom Left */}
          <div className="dashboard__hub-emergency">
            <button className="dashboard__hub-emergency-btn">Add Emergency Contact</button>
            <EmergencyContacts />EMERGENCY CONTACTS
          </div>
          {/* Bottom Right */}
          <div className="dashboard__hub-medication">MEDICATIONS</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

