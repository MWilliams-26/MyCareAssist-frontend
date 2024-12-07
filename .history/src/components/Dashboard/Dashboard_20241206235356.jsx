import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
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
          <div className="dashboard__hub-profile-left">
            <SetupProfile />
          </div>
          <div className="dashboard__hub-calendar"></div>                                                                                                                                                                                                                                                                
          <div className="dashboard__hub-doctor-">
            <DoctorsModal />
          </div>
          <div className="dashboard__hub-emergency">
            <EmergencyContacts />
          </div>
          <div className="dashboard__hub-medication"></div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

