import React, { useState, useEffect } from "react";
import { Calendar, localizer } from "react-big-calendar"; // Localizer from date-fns now
import { format, parseISO } from "date-fns"; // Importing date-fns functions
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import { googleSignIn, fetchUserInfo, loadCalendarEvents, createCalendarEvent } from "../../utils/api"; // Import functions from api.js
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";
import { ClipLoader } from "react-spinners";

// Date formatting function
const formatEventDate = (event) => ({
  title: event.summary,
  description: event.description || "No description",
  start: parseISO(event.start.dateTime || event.start.date), // parse using date-fns
  end: parseISO(event.end.dateTime || event.end.date),       // parse using date-fns
});

// Helper function to handle errors
const handleError = (error, setEvents) => {
  console.error(error);
  setEvents((prevEvents) => ({
    ...prevEvents,
    loading: false,
    error: error.message || "An unexpected error occurred.",
  }));
};

const CalendarComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [events, setEvents] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const { CLIENT_ID, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  // Initialize Google Sign-In API on load
  useEffect(() => {
    googleSignIn(CLIENT_ID, SCOPES, async (token) => {
      setAccessToken(token);
      try {
        const userInfo = await fetchUserInfo(token);
        setUserName(userInfo.name || userInfo.email);
        loadCalendarEventsData(token);
      } catch (err) {
        handleError(err, setEvents);
      }
    });
  }, []);

  const loadCalendarEventsData = async (token) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      loading: true,
    }));

    try {
      const data = await loadCalendarEvents(CALENDAR_ID, token);
      const loadedEvents = data.map((event) => formatEventDate(event));
      setEvents({
        data: loadedEvents,
        loading: false,
        error: null,
      });
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      const createdEvent = await createCalendarEvent(CALENDAR_ID, accessToken, newEvent);
      setEvents((prevEvents) => ({
        data: [...prevEvents.data, formatEventDate(createdEvent)],
        loading: false,
        error: null,
      }));
      setIsModalOpen(false);
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const handleSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
    setUserName(null);
    setEvents({ loading: false, data: [], error: null });
    setAccessToken(null);
  };

  const localizer = localizer(format);

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <h2 className="calendar__title">Schedule Appointment</h2>
        {userName && <div className="calendar__username">Welcome, {userName}!</div>}
        <div className="calendar__buttons">
          <button
            className="calendar__btn"
            onClick={() => setIsModalOpen(true)}
            disabled={isModalOpen || !userName}
          >
            Create Appointment
          </button>
          {userName ? (
            <button className="calendar__link-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <div id="google-signin-button"></div>
          )}
        </div>
      </div>

      {events.error && (
        <div className="error-message">
          <strong>Error:</strong> {events.error}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-labelledby="create-event-modal" aria-hidden={!isModalOpen}>
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal
              onEventSubmit={handleCreateEvent}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {events.loading ? (
        <div className="loading-message">
          <ClipLoader color={"#123abc"} loading={events.loading} size={50} />
          <p>Loading events...</p>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events.data}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100% - 80px)" }}
          popup
        />
      )}
    </div>
  );
};

export default CalendarComponent;
