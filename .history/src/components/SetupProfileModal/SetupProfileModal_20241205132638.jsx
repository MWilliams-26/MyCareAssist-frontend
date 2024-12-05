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
    </ModalWithForm>

  );
};