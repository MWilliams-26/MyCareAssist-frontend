import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { EMERGENCY_CONTACT_FIELDS } from '../../utils/constants';

const EmergencyContacts = ({ onClose, addEmergencyContact, isOpen }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    phone: "",
    relationship: "",
    notes: "",
  });
  
  const resetActiveForm = () => {
    resetForm({
      name: "",
      phone: "",
      relationship: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmergencyContact(values);
    resetActiveForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Emergency Contacts"
      buttonText={"Add Contact"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {EMERGENCY_CONTACT_FIELDS.map((field) => (
        <label key={field.id} className="modal__label">
          {field.label}
          <input
            type={field.type}
            className="modal__input"
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        </label>
      ))}
      <label className="modal__label">
        Notes
        <textarea
          className="modal__input"
          id="notes"
          name="notes"
          placeholder="Add any additional notes"
          value={values.notes}
          onChange={handleChange}
          rows="3"
        />
      </label>
    </ModalWithForm>
  );
};

export default EmergencyContacts;