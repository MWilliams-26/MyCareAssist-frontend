import '../Cards/Cards.css';

function DoctorCard({ doctor }) {
  return (
    <div className="doctor__card">
      <h3 className="doctor__card-name">{doctor.name}</h3>

















      <div className="profile-info-group">
        <h4 className="info-group-title">Contact Information</h4>
        <div className="doctor__card-details">
          <p className="doctor__card-detail">
            <span className="doctor__card-label">Phone:</span> {doctor.phone}
          </p>
          <p className="doctor__card-detail">
            <span className="doctor__card-label">Email:</span> {doctor.email}
          </p>
        </div>


      </div>
      
      <div className="profile-info-group">
        <h4 className="info-group-title">Professional Details</h4>
        <div className="doctor__card-details">
          <p className="doctor__card-detail">
            <span className="doctor__card-label">Specialty:</span> {doctor.specialty}
          </p>

          {doctor.notes && (
            <p className="doctor__card-detail">
              <span className="doctor__card-label">Notes:</span> {doctor.notes}
            </p>
          )}
        </div>
      </div>

      <div className="profile-info-group">
        <h4 className="info-group-title">Location</h4>
        <div className="doctor__card-details">
          <div className="doctor__card-detail">
            <span className="doctor__card-label">Address:</span>
            <div>
              {doctor.streetAddress}<br />
              {`${doctor.city}, ${doctor.state} ${doctor.zipCode}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default DoctorCard;