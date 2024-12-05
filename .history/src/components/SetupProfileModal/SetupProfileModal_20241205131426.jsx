import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const SetupProfile = ({}) => {
  const { values, handleChange, setValues, } = useForm({
    name: "",
    avatar: "",
  });


  return ()
}