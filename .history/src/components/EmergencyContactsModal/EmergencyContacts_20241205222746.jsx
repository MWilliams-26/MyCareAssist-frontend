import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const EmergencyContacts = ({ onClose, addEmergencyContact, isOpen }) => {
  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    phone: "",
    relationship: "",
  });

  const resetActiveForm = () => {
    resetForm({
      name: "",
      phone: "",
      relationship: "",
    });
  };