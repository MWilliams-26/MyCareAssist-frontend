import ModalWithForm from '../ModalWithForm/ModalWithForm';

const MedicationModal = ({ isOpen, onClose }) => {
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Medications"
      buttonText="Close"
      onClose={onClose}
    >
      <div className="modal__message">
        Coming Soon!
      </div>
    </ModalWithForm>
  );
};

export default MedicationModal;
