import '../Cards/Cards.css'

function EmergencyContactCard({ contact }) {
  return (
    <div className="emergency__card">
      <h3 className="emergency__card-name">{contact.name}</h3>
      <div className="emergency__card-details">
        <p className="emergency__card-detail">
          <span className="emergency__card-label">Phone:</span> {contact.phone}
        </p>
        <p className="emergency__card-detail">
          <span className="emergency__card-label">Relationship:</span> {contact.relationship}
        </p>
        {contact.notes && (
          <p className="emergency__card-detail">
            <span className="emergency__card-label">Notes:</span> {contact.notes}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmergencyContactCard;
