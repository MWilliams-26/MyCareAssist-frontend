import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const EmergencyContacts = ({ onClose, addEmergencyContact, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    phone: "",
    relationship: "",
  });

  const resetActiveForm = () => {
    resetForm({
      name: "",
      phone: "",
      relationship: "",
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
      buttonText={"Add Emergency Contact"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Enter name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Phone{""}
        <input
          type="tel"
          className="modal__input"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={values.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Relationship{""}
        <input
          type="text"
          className="modal__input"
          id="relationship"
          name="relationship"
          placeholder="Enter relationship"
          value={values.relationship}
          onChange={handleChange}
          required
          />
          </label>
          </ModalWithForm>
          );
};

export default EmergencyContacts;