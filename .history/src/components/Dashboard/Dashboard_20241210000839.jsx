import SetupProfile from "../SetupProfileModal/SetupProfileModal";
import DoctorsModal from "../DoctorsModal/DoctorsModal";
import EmergencyContacts from "../EmergencyContactsModal/EmergencyContacts";
import CalendarComponent from "../Calendar/CalendarComponent";
import "./Dashboard.css";

function Dashboard({ profileData, handleCreateProfile, handleCreateProfileClick, handleAddDoctorClick, handleAddEmergencyContactClick, handleAddMedicationClick }) {
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
            {profileData ? (
              <div className="dashboard__profile-info">
                <p><strong>Name:</strong> {profileData.name}</p>
                <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                <p>
                  <strong>Address:</strong><br />
                  {profileData.address.street}<br />
                  {profileData.address.cityStateZip}
                </p>
                <p><strong>Gender:</strong> {profileData.gender}</p>
                <p><strong>Height:</strong> {profileData.height}</p>
                <p><strong>Weight:</strong> {profileData.weight}</p>
                <p><strong>Blood Type:</strong> {profileData.bloodType}</p>
                <p><strong>Allergies:</strong> {profileData.allergies}</p>
              </div>
            ) : (
              <button className="dashboard__hub-profile-btn" onClick={handleCreateProfileClick}>
                Create Profile +
              </button>
            )}
            <SetupProfile />
          </div>
          {/* Calendar Section */}
          <div className="dashboard__hub-calendar">
            <CalendarComponent />
          </div>
          {/*Right Section */}
          <div className="dashboard__hub-doctor">
            <h2 className="dashboard__hub-doctor-title">Doctors</h2>
            <button className="dashboard__hub-doctor-btn" onClick={handleAddDoctorClick}>Add Doctor +</button>
            <DoctorsModal />
          </div>
          {/* Bottom Left */}
          <div className="dashboard__hub-emergency">
            <h2 className="dashboard__hub-emergency-title">Emergency Contacts</h2>
            <button className="dashboard__hub-emergency-btn" onClick={handleAddEmergencyContactClick}>Add Emergency Contact +</button>
            <EmergencyContacts />
          </div>
          {/* Bottom Right */}
          <div className="dashboard__hub-medication">
            <h2 className="dashboard__hub-medication-title">Medication</h2>
            <button className="dashboard__hub-medication-btn" onClick={handleAddMedicationClick}>Add Medication +</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

