import React, { useState } from "react";
import "./CreateEventFormModal.css";

const CreateEventFormModal = ({ onEventSubmit }) => {

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log('New event:', event);    e.preventDefault();
    const event = {
      ...formValues,
      start: new Date(formValues.start),
      end: new Date(formValues.end)
    };
    onEventSubmit(event);
    console.log('All events:', events);
    setFormValues({
      title: "",
      description: "",
      start: "",
      end: "",
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
