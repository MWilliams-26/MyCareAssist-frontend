import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from '../../hooks/useForm';
import { DOCTOR_FORM_FIELDS } from '../../utils/constants';

const DoctorsModal = ({ onClose, addDoctor, isOpen }) => {
  const initialValues = {
    specialty: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    notes: "",











  };

  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(values);

    resetForm(initialValues);
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
          {field.type === "textarea" ? (
            <textarea
              className="modal__input"
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          ) : (
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
          )}
        </label>
      ))}
    </ModalWithForm>
  );
};


export default DoctorsModal;