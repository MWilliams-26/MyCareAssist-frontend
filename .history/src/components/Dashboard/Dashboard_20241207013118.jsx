import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
import Cal
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
            <SetupProfile />SETUP PROFILE
          </div>
          {/* Calendar Section */}
          <div className="dashboard__hub-calendar">CALENDAR</div>
          {/*Right Section */}                                                                                                                                                                                                                                                
          <div className="dashboard__hub-doctor">
            <DoctorsModal />DOCTORS
          </div>
          {/* Bottom Left */}
          <div className="dashboard__hub-emergency">
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

