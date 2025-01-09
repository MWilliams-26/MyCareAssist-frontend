import React, { useState } from "react";
import "./CreateEventFormModal.css";
import close from "../../assets/close.svg";

const CreateEventFormModal = ({ onEventSubmit, onClose }) => {
  const defaultStart = new Date().toISOString().slice(0, 16);
  const defaultEnd = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);

  const [formValues, setFormValues] = useState({
    summary: "",
    description: "",
    startDateTime: defaultStart,
    endDateTime: defaultEnd,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formValues.endDateTime) <= new Date(formValues.startDateTime)) {
      alert("End time must be after start time.");
      return;
    }
    if (new Date(formValues.startDateTime) < new Date()) {
      alert("Start time cannot be in the past.");
      return;
    }
    onEventSubmit(formValues);
    setFormValues({
      summary: "",
      description: "",
      startDateTime: defaultStart,
      endDateTime: defaultEnd,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <button className="modal__close" onClick={onClose}>
            <img src={close} alt="Close" className="modal__close-btn" />
          </button>
        </div>
        <form className="event__form" onSubmit={handleSubmit}>
          <input
            id="summary"
            type="text"
            name="summary"
            value={formValues.summary}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
          />
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            required
          />

          <div className="datetime__field">
            <label htmlFor="startDateTime">Start Time:</label>
            <input
              id="startDateTime"
              type="datetime-local"
              name="startDateTime"
              value={formValues.startDateTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="datetime__field">
            <label htmlFor="endDateTime">End Time:</label>
            <input
              id="endDateTime"
              type="datetime-local"
              name="endDateTime"
              value={formValues.endDateTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__buttons">
            <button className="form__button-create" type="submit">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventFormModal;