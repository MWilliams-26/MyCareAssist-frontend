import React, { useState } from "react";
import "./CreateEventFormModal.css";

const CreateEventFormModal = ({ onEventSubmit }) => {
  const [error, setError] = useState("");
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
      setError("End time must be after start time.");
      return;
    }
    setError("");
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
      <input
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
