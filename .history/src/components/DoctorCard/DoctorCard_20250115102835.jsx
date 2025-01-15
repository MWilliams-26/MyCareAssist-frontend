import '../Cards/Cards.css';

function DoctorCard({ doctor }) {
  return (
    <div className="doctor__card">
      <h3 className="doctor__card-name">{doctor.name}</h3>
      <div className="doctor__card-details">
        <p className="doctor__card-detail">
          <span className="doctor__card-label">Specialty:</span> {doctor.specialty}
        </p>
        <p className="doctor__card-detail">
          <span className="doctor__card-label">Phone:</span> {doctor.phone}
        </p>
        <p className="doctor__card-detail">
          <span className="doctor__card-label">Email:</span> {doctor.email}
        </p>
        <p className="doctor__card-detail">
          <span className="doctor__card-label">Address:</span> 
          {`${doctor.address.street}, ${doctor.address.cityStateZip}`}
        </p>
        {doctor.notes && (
          <p className="doctor__card-detail">
            <span className="doctor__card-label">Notes:</span> {doctor.notes}
          </p>
        )}
      </div>
    </div>
  );
}

export default DoctorCard;




