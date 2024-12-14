import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import { GoogleLogin } from '@react-oauth/google'; // Import the new GoogleLogin component
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";

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

  const { CLIENT_ID, API_KEY, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  // Handle modal closing
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Initialize gapi client
  const initializeGAPI = () => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    });
  };

  useEffect(() => {
    initializeGAPI();
  }, []);

  // Load Google Calendar events
  const loadCalendarEvents = async (accessToken) => {
    try {
      // Set token for authorization
      window.gapi.auth.setToken({ access_token: accessToken });

      // Load the Google Calendar API
      await window.gapi.client.load("calendar", "v3");

      // Get events from Google Calendar
      const response = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const loadedEvents = response.result.items.map((event) => ({
        title: event.summary,
        description: event.description || "No description",
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents(loadedEvents);
    } catch (err) {
      console.error("Error loading calendar events:", err);
      setError("Failed to load calendar events");
    }
  };

  // Handle authentication success
  const handleAuthSuccess = async (response) => {
    const accessToken = response.credential; // Get the access token

    // Load events using the token
    loadCalendarEvents(accessToken);

    try {
      // Fetch user info from Google API
      const userInfoResponse = await window.gapi.client.request({
        path: "https://www.googleapis.com/oauth2/v3/userinfo",
      });
      setUserName(userInfoResponse.result.name || userInfoResponse.result.email);
    } catch (err) {
      console.error("Failed to get user info:", err);
    }

    setLoading(false);
  };

  // Handle authentication failure
  const handleAuthFailure = (error) => {
    console.error("Google authentication failed", error);
    setError("Google authentication failed");
    setLoading(false);
  };

  // Handle sign-out
  const handleSignOut = () => {
    setUserName(null);
    setEvents([]);
    if (onGoogleSignOut) onGoogleSignOut();
    console.log("User signed out successfully");
  };

  // Handle event submission (add event)
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <h2 className="calendar__title">My Calendar</h2>
        {userName && <div>Welcome, {userName}!</div>}
        <div className="calendar__buttons">
          <button className="calendar__btn" onClick={() => setIsModalOpen(true)}>
            Create Event
          </button>
          {userName ? (
            <button className="calendar__link-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleAuthSuccess}
              onError={handleAuthFailure}
              useOneTap
              size="large"
              theme="outline"
              text="sign_in_with"
              logo_alignment="left"
            />
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleModalClose}>
              <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal
              onEventSubmit={handleAddEvent}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100% - 80px)" }}
      />
    </div>
  );
};

export default CalendarComponent;
