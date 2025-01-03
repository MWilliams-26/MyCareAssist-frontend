import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { US_STATES } from '../../utils/constants';
import { formFields } from '../../utils/constants';
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
    heightFeet: profile?.height?.split("'")[0] || "",
    heightInches: profile?.height?.split("'")[1]?.replace('"', "") || "",
    weightUnit: profile?.weight?.slice(-3) || "",
    weightValue: profile?.weight?.slice(0, -3) || "",
    bloodType: profile?.bloodType || "",
    allergies: profile?.allergies || "",
  });

  const selectFields = {
    state: {
      options: US_STATES.map(state => ({
        value: state.value,
        label: state.label
      })),
      placeholder: "Select State"
    },
    gender: {
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
        { value: "prefer-not-to-say", label: "Prefer not to say" }
      ],
      placeholder: "Select Gender"
    },
    bloodType: {
      options: [
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" }
      ],
      placeholder: "Select Blood Type"
    },
    weightUnit: {
      options: [
        { value: "lbs", label: "lbs" },
        { value: "kg", label: "kg" }
      ],
      placeholder: "Select Unit"
    },
    heightFeet: {
      options: Array.from({ length: 8 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1} ft`
      })),
      placeholder: "Select Feet"
    },
    heightInches: {
      options: Array.from({ length: 12 }, (_, i) => ({
        value: String(i),
        label: `${i} in`
      })),
      placeholder: "Select Inches"
    },
    weightValue: {
      options: Array.from({ length: 401 }, (_, i) => ({
        value: String(i + 20),
        label: String(i + 20)
      })),
      placeholder: "Select Weight"
    }
  };

  const renderField = (field) => {
    const baseProps = {
      className: "modal__input",
      name: field.name,
      value: values[field.name],
      onChange: handleChange,
      required: field.required
    };

    if (selectFields[field.name]) {
      return (
        <label className="modal__label" key={field.name}>
          {field.label}
          <select {...baseProps}>
            <option value="">{selectFields[field.name].placeholder}</option>
            {selectFields[field.name].options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );
    }

    return (
      <label className="modal__label" key={field.name}>
        {field.label}
        <input
          type={field.type}
          placeholder={field.placeholder}
          {...baseProps}
        />
      </label>
    );
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
    resetForm();
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={profile ? "Edit Profile" : "Setup Profile"}
      buttonText={profile ? "Update Profile" : "Create Profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="setup__profile-container">
        <div className="profile-info-group">
          <div className="full-width">
            <label className="modal__label">
              Name
              <input type="text" className="modal__input" />
            </label>
          </div>
          <div className="full-width">
            <label className="modal__label">
              Street Address
              <input type="text" className="modal__input" />
            </label>
          </div>
          <label className="modal__label">
            Date of Birth
            <input type="date" className="modal__input" />
          </label>
          <label className="modal__label">
            City
            <input type="text" className="modal__input" />
          </label>
          <div className="state-zip">
            <label className="modal__label">
              State
              <select className="modal__input">
                {US_STATES.map(state => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
            </label>
            <label className="modal__label">
              ZIP Code
              <input type="text" className="modal__input" />
            </label>
          </div>
        </div>
        {Object.entries(formFields).map(([section, fields]) => (
          <div key={section}>
            {fields.map(renderField)}
          </div>
        ))}
      </div>
    </ModalWithForm>
  );
};

export default SetupProfile;