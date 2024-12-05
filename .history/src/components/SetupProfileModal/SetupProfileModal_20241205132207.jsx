import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const SetupProfile = ({ onClose}) => {
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
    console.log(values);
    resetActiveForm();
  };

  return (
    <ModalWithForm

  )
}