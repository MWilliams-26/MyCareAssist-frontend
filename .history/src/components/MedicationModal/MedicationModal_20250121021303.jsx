import ModalWithForm from '../ModalWithForm/ModalWithForm';

const MedicationModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Medications"
      buttonText="Close"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__message">
        Coming Soon!
      </div>
    </ModalWithForm>
  );
};

export default MedicationModal;