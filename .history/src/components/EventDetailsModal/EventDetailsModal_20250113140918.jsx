import React from 'react';
import moment from 'moment';
import close from "../../assets/close.svg";
import './EventDetailsModal.css';

const EventDetailsModal = ({ event, onClose }) => {
  return (
    <div className="event-modal__container">
      <div className="event-modal__content">
        <div className="event-modal__header">
          <h3 className="event-modal__title">{event.title}</h3>
          <img
            src={close}
            alt="Close"
            onClick={onClose}
            className="event-modal__close-icon"
          />
        </div>
        <p className="event-modal__description">{event.description}</p>
        <p className="event-modal__time">
          Start: {moment(event.start).format('MMMM Do YYYY, h:mm a')}
        </p>
        <p className="event-modal__time">
          End: {moment(event.end).format('MMMM Do YYYY, h:mm a')}
        </p>
      </div>
    </div>
  );
};

export default EventDetailsModal;
