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
          name="dob"
          placeholder="Enter your date of birth"
          value={values.dob}
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
          placeholder="Enter your address"
          value={values.address}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Gender{""}
        <select
          className="modal__input"
          id="gender"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
          <option value="prefer-not-to-say">Prefer Not to Say</option>
        </select>
      </label>
      <label className="modal__label">
      Height{""}
      <select
      className="modal__input"
      id="height"
      name="height"
      value={values.height}
      onChange={handleChange}
      required
      >
      <option value="">Select your height</option>
      <option value="cm">cm</option>
      <option value="in">in</option>
      </select>
      </label>
      <label className="modal__label">
      Weight{""}
      <select
      className="modal__input"
      id="weight"
      name="weight"
      value={values.weight}
      onChange={handleChange}
      required
      >
        <option value="">Select your weight</option>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>
      </label>
      <label className="modal__label">
      Blood Type{""}
      <label className="modal__label">
      type="text"
      className="modal__input"
      id="bloodType"
      name="bloodType"
      placeholder="Enter your blood type"

    </ModalWithForm>

  );
};