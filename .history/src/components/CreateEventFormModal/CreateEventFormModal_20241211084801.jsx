import React, { useState } from "react";
import "./CreateEventFormModal.css";

const CreateEventFormModal = ({ onEventSubmit }) => {
  const defaultStart = 
  const [formValues, setFormValues] = useState({
    summary: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
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
    onEventSubmit(formValues); // Pass form values to the parent component
    setFormValues({
      summary: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <label htmlFor="summary">Event Title:</label>
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

      <div className="datetime-field">
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
      <div className="datetime-field">
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
      <button type="submit">Create Event</button>
    </form >
  );
};

export default CreateEventFormModal;
