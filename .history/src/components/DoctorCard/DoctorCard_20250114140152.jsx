function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <h3 className="doctor-card__name">{doctor.name}</h3>
      <div className="doctor-card__details">
        <p className="doctor-card__detail">
          <span className="doctor-card__label">Specialty:</span> {doctor.specialty}
        </p>
        <p className="doctor-card__detail">
          <span className="doctor-card__label">Phone:</span> {doctor.phone}
        </p>
        <p className="doctor-card__detail">
          <span className="doctor-card__label">Email:</span> {doctor.email}
        </p>
        <p className="doctor-card__detail">
          <span className="doctor-card__label">Address:</span> {doctor.address}
        </p>
        {doctor.notes && (
          <p className="doctor-card__detail">
            <span className="doctor-card__label">Notes:</span> {doctor.notes}
          </p>
        )}
      </div>
    </div>
  );
}
