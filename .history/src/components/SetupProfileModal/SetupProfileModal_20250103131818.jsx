import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { US_STATES } from '../../utils/constants';
import { formFields } from './formConfig';
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

  const renderField = (field) => {
    const baseProps = {
      className: "modal__input",
      name: field.name,
      value: values[field.name],
      onChange: handleChange,
      required: field.required
    };

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