import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from '../../hooks/useForm';

const DoctorsModal = ({ onClose,  isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    specialty: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    notes: "",
  });

  const resetActiveForm = () => {
    resetForm({
      specialty: "",
      name: "",
      phone: "",
      address: "",
      email: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    resetActiveForm();
  };