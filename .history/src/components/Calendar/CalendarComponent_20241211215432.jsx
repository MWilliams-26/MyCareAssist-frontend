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
import { ca } from "date-fns/locale";

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
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          });
          console.log("Google Calendar API loaded successfully.");
        } catch (err) {
          console.error("Error initializing Google Calendar API:", err);
          setError("Error initializing Google Calendar API. Try again!");
        }
      });
    };
    loadGoogleApi();
  }, [API_KEY]);

  const handleAuthClick = async () => {
    setLoading(true);
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar",
      callback: (response) => {
        if (response.error) {
          console.error("Authentication error:", response);
          setError("Authentication failed");
        } else {
          console.log("Access token acquired");
          setError(null);
          loadCalendarEvents(response.access_token);
        }
        setLoading(false);
      },
    });
    tokenClient.requestAccessToken();
  };

  const loadCalendarEvents = async (accessToken) => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const loadedEvents = response.result.items.map((event) => ({
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));
      setEvents(loadedEvents);
      setError(null);
    } catch (err) {
      console.error("Error loading calendar events:", err);
      setError("Failed to load calendar events. Try again!");
    }
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
