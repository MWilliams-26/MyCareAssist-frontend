import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import './SetupProfileModal.css';

const SetupProfile = ({ onClose, createProfile, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    dob: "",
    address: "",
    gender: "",
    heightUnit: "",
    heightValue: "",
    weightUnit: "",
    weightValue: "",
    bloodType: "",
    allergies: "",
  });

  const resetActiveForm = () => {
    resetForm({
      name: "",
      dob: "",
      address: "",
      gender: "",
      heightUnit: "",
      heightValue: "",
      weightUnit: "",
      weightValue: "",
      bloodType: "",
      allergies: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      name: values.name,
      dob: values.dob,
      address: values.address,
      gender: values.gender,
      height: `${values.heightValue}${values.heightUnit}`,
      weight: `${values.weightValue}${values.weightUnit}`,
      bloodType: values.bloodType,
      allergies: values.allergies,
    };
    createProfile(formattedData);
    resetActiveForm();
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Setup Profile"
      buttonText={"Edit Profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <div className="setup__profile-container">
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

<div className="meausrem">
  <label className="modal__label">
    Height
    <div className="measurement-inputs">
      <input
        type="number"
        className="modal__input"
        name="heightValue"
        placeholder="Enter height"
        value={values.heightValue}
        onChange={handleChange}
        required
      />
      <select
        className="modal__input"
        name="heightUnit"
        value={values.heightUnit}
        onChange={handleChange}
        required
      >
        <option value="">Unit</option>
        <option value="cm">cm</option>
        <option value="in">in</option>
      </select>
    </div>
  </label>
</div>


        <div className="setup__profile-measurements">
          <label className="modal__label">
            Height
            <div className="measurement-inputs">
              <input
                type="number"
                className="modal__input"
                name="heightValue"
                placeholder="Enter height"
                value={values.heightValue}
                onChange={handleChange}
                required
              />
              <select
                className="modal__input"
                name="heightUnit"
                value={values.heightUnit}
                onChange={handleChange}
                required
              >
                <option value="">Unit</option>
                <option value="cm">cm</option>
                <option value="in">in</option>
              </select>
            </div>
          </label>
        </div>
        <div className="setup__profile-measurements">
        <label className="modal__label">
    Weight
    <div className="measurement-inputs">
      <input
        type="number"
        className="modal__input"
        name="weightValue"
        placeholder="Enter weight"
        value={values.weightValue}
        onChange={handleChange}
        required
      />
      <select
        className="modal__input"
        name="weightUnit"
        value={values.weightUnit}
        onChange={handleChange}
        required
      >
        <option value="">Unit</option>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>
    </div>
  </label>
        </div>

        <label className="modal__label">
          Blood Type{""}
          <select
            className="modal__input"
            id="bloodType"
            name="bloodType"
            value={values.bloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>
        <label className="modal__label">
          Allergies{""}
          <input
            type="text"
            className="modal__input"
            id="allergies"
            name="allergies"
            placeholder="list any allergies"
            value={values.allergies}
            onChange={handleChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default SetupProfile;