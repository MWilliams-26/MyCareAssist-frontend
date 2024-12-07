import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
import "./Dashboard.css";

function Dashboard({ }) {
  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <h1>My Care Assist</h1>
        <p>Welcome to your dashboard!</p>
      </section>
      <section className="dashboard__hub">
        <h2>Your Hub</h2>
        <div className="dashboard__hub-container">
        {/* Left Section */}
          <div className="dashboard__hub-profile">
            <SetupProfile />SETUPPROFI
          </div>
          {/* Calendar Section */}
          <div className="dashboard__hub-calendar">CALENDAR</div>
          {/*Right Section */}                                                                                                                                                                                                                                                
          <div className="dashboard__hub-doctor">
            <DoctorsModal />
          </div>
          {/* Bottom Left */}
          <div className="dashboard__hub-emergency">
            <EmergencyContacts />
          </div>
          {/* Bottom Right */}
          <div className="dashboard__hub-medication"></div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

