import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from '../../hooks/useForm';


const DoctorsModal = ({ onClose, addDoctor, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    specialty: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    notes: "",
  });

  const resetActiveForm = () => {
    resetForm({
      specialty: "",
      name: "",
      phone: "",
      address: "",
      email: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(values);
    resetActiveForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Doctors"
      buttonText={"Add Doctor"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Specialty{""}
        <input
          type="text"
          className="modal__input"
          id="specialty"
          name="specialty"
          placeholder="Enter specialty"
          value={values.specialty}
          onChange={handleChange}
          required
        />
      </label>
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
        Address{""}
        <input
          type="text"
          className="modal__input"
          id="address"
          name="address"
          placeholder="Enter address"
          value={values.address}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Notes{""}
        <textarea
          className="modal__input"
          id="notes"
          name="notes"
          placeholder="Enter notes"
          value={values.notes}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default DoctorsModal;
