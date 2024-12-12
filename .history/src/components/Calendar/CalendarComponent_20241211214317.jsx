import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { gapi } from "gapi-script";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";
import { set } from "date-fns";

const CalendarComponent = ({ onGoogleSignOut }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Doctor's Appointment",
      description: "Annual checkup",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 11, 29, 10, 0),
    },
  ]);

  const { CLIENT_ID, API_KEY, CALENDAR_ID } = GOOGLE_CALENDAR_CONFIG;

  useEffect(() => {
    const loadGoogleApi = () => {
      if (!window.google) {
        setError("Google API script not loaded. Bonk!");
        return;
      }
      window.gapi.load("client", async () => {
        try {
          await window.gapi.client.init({
            apiKey: API_KEY,
            disco
          })
        }
      })
    }

  const handleAuthClick = async () => {
    setLoading(true);
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance) {
        console.error("Google Auth instance not available-ensure gapi.load is initialized");
        setError("Google Auth instance not available. Give it another go!")
        return;
      }
      const googleUser = await authInstance.signIn();
      const profile = googleUser.getBasicProfile();
      console.log("Signed in as:", profile.getName());
      setUserName(profile.getName());
      loadCalendarEvents();
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError("Sign-In failed. Give me your best shot!");
    } finally {
      setLoading(false);
    }
  };

  const loadCalendarEvents = () => {
    setLoading(true);
    gapi.client.calendar.events
      .list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items.map((event) => ({
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));
        setEvents(events);
        setError(null);
      }).catch((error) => {
        console.error("Error loading calendar events:", error);
        setError("Failed to load calendar events. Something's not right!");
      }).finally(() => {
        setLoading(false);
      });
  };

  const handleSignOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signOut()
      .then(() => {
        setUserName(null);
        setEvents([]);
        if (onGoogleSignOut) onGoogleSignOut();
        console.log('User signed out of Google Calendar');
      }).catch((error) => {
        console.error('Error signing out of Google Calendar:', error);
        setError("Sign-out failed. Don't gooooo!");
      });
  };

  const handleAddEvent = (formValues) => {
    const newEvent = {
      title: formValues.summary,
      description: formValues.description,
      start: new Date(formValues.startDateTime),
      end: new Date(formValues.endDateTime),
    };
    console.log('Adding new event:', newEvent);
    setEvents([...events, newEvent]);
    setIsModalOpen(false); // Close modal after adding event
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <h2 className="calendar__title">My Calendar</h2>
        <div className="calendar__buttons">
          <button className="calendar__btn" onClick={() => setIsModalOpen(true)}>
            Create Event
          </button>
          {userName ? (
            <button className="calendar__link-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button
              className="calendar__link-btn"
              onClick={handleAuthClick}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Google Calendar"}
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
            <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal onEventSubmit={handleAddEvent} />
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 80px)' }}
      />
    </div>
  );
};

export default CalendarComponent;

