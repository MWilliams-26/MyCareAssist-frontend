import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const MedicationModal = ({ onClose, isOpen }) => {
  const { values, handleChange, resetForm } = useForm({
    medicationName: "",
    dosage: "",
    frequency: "",
    prescribedBy: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const resetActiveForm = () => {
    resetForm({
      medicationName: "",
      dosage: "",
      frequency: "",
      prescribedBy: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Coming Soon: Medication Management Feature");
    resetActiveForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Medications"
      buttonText="Add Medication"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Medication Name
        <input
          type="text"
          className="modal__input"
          id="medication-name"
          name="medicationName"
          placeholder="Enter medication name"
          value={values.medicationName}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Dosage
        <input
          type="text"
          className="modal__input"
          id="medication-dosage"
          name="dosage"
          placeholder="Enter dosage"
          value={values.dosage}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Frequency
        <input
          type="text"
          className="modal__input"
          id="medication-frequency"
          name="frequency"
          placeholder="How often to take"
          value={values.frequency}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Prescribed By
        <input
          type="text"
          className="modal__input"
          id="medication-prescribed-by"
          name="prescribedBy"
          placeholder="Doctor's name"
          value={values.prescribedBy}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Start Date
        <input
          type="date"
          className="modal__input"
          id="medication-start-date"
          name="startDate"
          value={values.startDate}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        End Date
        <input
          type="date"
          className="modal__input"
          id="medication-end-date"
          name="endDate"
          value={values.endDate}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Notes
        <textarea
          className="modal__input"
          id="medication-notes"
          name="notes"
          placeholder="Add any additional notes"
          value={values.notes}
          onChange={handleChange}
          rows="3"
        />
      </label>
    </ModalWithForm>
  );
};

export default MedicationModal;
