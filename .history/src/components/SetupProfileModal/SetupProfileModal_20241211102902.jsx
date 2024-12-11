import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { US_STATES } from '../../utils/constants';
import './SetupProfileModal.css';

const SetupProfile = ({ profile, onClose, createProfile, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    name: profile?.name || "",
    dob: profile?.dob || "",
    streetAddress: profile?.address?.street || "",
    city: profile?.address?.city || "",
    state: profile?.address?.state || "",
    zipcode: profile?.address?.zipcode || "",
    gender: profile?.gender || "",
    heightFeet: profile?.height?.split("'")[0] || "", // Assuming height format is '5'8"
    heightInches: profile?.height?.split("'")[1]?.replace('"', "") || "",
    weightUnit: profile?.weight?.slice(-3) || "", // Assuming weight format is '180lbs' or '82kg'
    weightValue: profile?.weight?.slice(0, -3) || "",
    bloodType: profile?.bloodType || "",
    allergies: profile?.allergies || "",
  });

  const resetActiveForm = () => {
    resetForm({
      name: "",
      dob: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      gender: "",
      heightFeet: "",
      heightInches: "",
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
      address: {
        street: values.streetAddress,
        cityStateZip: `${values.city}, ${values.state} ${values.zipcode}`
      },
      gender: values.gender,
      height: `${values.heightFeet}'${values.heightInches}"`,
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
      title={profile ? "Edit Profile" : "Setup Profile"}
      buttonText={profile ? "Update Profile" "Edit Profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <div className="setup__profile-container">
        <label className="modal__label">
          Name
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
          Date of Birth
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
        <label className="modal__label full-width">
          Street Address
          <input
            type="text"
            className="modal__input"
            name="streetAddress"
            placeholder="Enter street address"
            value={values.streetAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal__label">
          City
          <input
            type="text"
            className="modal__input"
            name="city"
            placeholder="Enter city"
            value={values.city}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal__label">
          State
          <select
            className="modal__input"
            name="state"
            value={values.state}
            onChange={handleChange}
            required
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </label>

        <label className="modal__label">
          Zip code
          <input
            type="text"
            className="modal__input"
            name="zipcode"
            placeholder="Enter zipcode"
            pattern="[0-9]{5}"
            maxLength="5"
            value={values.zipcode}
            onChange={handleChange}
            required
          />
        </label>
        <label className="modal__label">
          Gender
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

        <div className="measurement__group">
          <label className="modal__label">
            Height
            <div className="measurement__inputs">
              <input
                type="number"
                className="modal__input"
                name="heightFeet"
                placeholder="Feet"
                value={values.heightFeet}
                onChange={handleChange}
                min="0"
                max="8"
                required
              />
              <input
                type="number"
                className="modal__input"
                name="heightInches"
                placeholder="Inches"
                value={values.heightInches}
                onChange={handleChange}
                min="0"
                max="11"
                required
              />
            </div>
          </label>
        </div>

        <div className="measurement__group">
          <label className="modal__label">
            Weight
            <div className="measurement__inputs">
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