import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const SetupProfile = ({ onClose, createProfile, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    dob: "",
    address: "",
    gender: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
  });

  const resetActiveForm = () => {
    resetForm({
      name: "",
      dob: "",
      address: "",
      gender: "",
      height: "",
      weight: "",
      bloodType: "",
      allergies: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(values);
    resetActiveForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Setup Profile"
      buttonText={"Edit Profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    <label className="modal__label">
    Name{""}
    <input
    type="text"
    className="modal__input"
    id="user-name"
    name="name"
    placeholder="Enter your full name"
    value={values.name}
    onChange={handleChange}
    required
    />
    </label>
    <label className="modal__label">
    Date of Birth{""}
    <input
    type="date"
    className="modal__input"
    id="dob"
    name="
    </ModalWithForm>

  );
};