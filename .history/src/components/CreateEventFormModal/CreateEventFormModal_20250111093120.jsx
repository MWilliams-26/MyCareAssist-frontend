import React, { useState } from "react";
import "./CreateEventFormModal.css";
import close from "../../assets/close.svg";

const CreateEventFormModal = ({ onEventSubmit, onClose }) => {
  const defaultStart = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const defaultEnd = new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

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

  const formatDateTimeForSubmission = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toISOString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedEvent = {
      summary: formValues.summary,
      description: formValues.description,
      start: {
        dateTime: formatDateTimeForSubmission(formValues.startDateTime)
      },
      end: {
        dateTime: formatDateTimeForSubmission(formValues.endDateTime)
      }
    };

    if (new Date(formValues.endDateTime) <= new Date(formValues.startDateTime)) {
      alert("End time must be after start time.");
      return;
    }
    if (new Date(formValues.startDateTime) < new Date()) {
      alert("Start time cannot be in the past.");
      return;
    }

    onEventSubmit(formattedEvent);
    setFormValues({
      summary: "",
      description: "",
      startDateTime: defaultStart,
      endDateTime: defaultEnd,
    });
  };

  const handleOverlayClick = (e)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal__header">
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
