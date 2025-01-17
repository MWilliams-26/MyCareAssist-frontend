import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from '../../hooks/useForm';
import { DOCTOR_FORM_FIELDS, US_STATES } from '../../utils/constants';

const DoctorsModal = ({ onClose, addDoctor, isOpen }) => {
  const { values, handleChange, resetForm } = useForm({
    specialty: "",
    name: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    notes: "",
  });

  const resetActiveForm = () => {
    resetForm({
      specialty: "",
      name: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...values,
      address: {
        street: values.streetAddress,
        cityStateZip: `${values.city}, ${values.state} ${values.zipCode}`
      }
    };
    addDoctor(formattedData);
    resetActiveForm();
  };

  const renderFormField = (field) => {
    const uniqueId = `doctor-${field.name}`;

    if (field.type === "textarea") {
      return (
        <textarea
          className="modal__input"
          id={uniqueId}
          name={field.name}
          placeholder={field.placeholder}
          value={values[field.name]}
          onChange={handleChange}
          required={field.required}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          className="modal__input"
          id={uniqueId}
          name={field.name}
          value={values[field.name]}
          onChange={handleChange}
          required={field.required}
        >
          <option value="">Select a state</option>
          {US_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      );
    }

    return (
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
    );
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Doctors"
      buttonText={"Add Doctor"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {DOCTOR_FORM_FIELDS.map((field) => (
        <label key={field.id} className="modal__label">
          {field.label}{""}
          {renderFormField(field)}
        </label>
      ))}
    </ModalWithForm>
  );
};

export default DoctorsModal;