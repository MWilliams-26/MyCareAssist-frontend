import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Load Google API
  useEffect(() => {
    const loadGoogleApi = async () => {
      if (!window.gapi) {
        setError("Google API script not loaded.");
        return;
      }

      try {
        await window.gapi.load("client:auth2", () => {
          window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: SCOPES,
          }).then(() => {
            console.log("Google Calendar API initialized.");
          }).catch(err => {
            console.error("Error initializing Google Calendar API:", err);
            setError("Error initializing Google Calendar API. Try again!");
          });
        });
      } catch (err) {
        console.error("Error loading Google API:", err);
        setError("Error loading Google API.");
      }
    };

    loadGoogleApi();
  }, [API_KEY, CLIENT_ID, SCOPES]);

  // OAuth authentication handler
  const handleAuthClick = () => {
    setLoading(true);

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          console.error("Authentication error:", tokenResponse);
          setError("Authentication failed");
          setLoading(false);
          return;
        }

        // Fetch user info
        try {
          const userInfoResponse = await window.gapi.client.request({
            path: "https://www.googleapis.com/oauth2/v3/userinfo",
          });
          setUserName(userInfoResponse.result.name || userInfoResponse.result.email); // Use name or email
        } catch (err) {
          console.error("Failed to get user info:", err);
        }

        // Load Google Calendar events
        loadCalendarEvents(tokenResponse.access_token);
        setLoading(false);
      },
    });

    tokenClient.requestAccessToken();
  };

  // Load calendar events from Google Calendar
  const loadCalendarEvents = async (accessToken) => {
    try {
      if (!window.gapi) {
        throw new Error("Google API is not available");
      }

      const response = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const loadedEvents = response.result.items.map((event) => ({
        title: event.summary,
        description: event.description || "No description", // Default if no description
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents(loadedEvents);
    } catch (err) {
      console.error("Error loading calendar events:", err);
      setError("Failed to load calendar events");
    }
  };

  // Add event locally and to Google Calendar
  const handleAddEvent = async (formValues) => {
    const newEvent = {
      summary: formValues.summary,
      description: formValues.description,
      start: {
        dateTime: new Date(formValues.startDateTime).toISOString(),
        timeZone: 'UTC', // Set timezone
      },
      end: {
        dateTime: new Date(formValues.endDateTime).toISOString(),
        timeZone: 'UTC', // Set timezone
      },
    };

    try {
      await window.gapi.client.calendar.events.insert({
        calendarId: 'primary', 
        resource: newEvent,
      });
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
      setError("Failed to add event to Google Calendar.");
    }
  };

  const handleSignOut = () => {
    setUserName(null);
    setEvents([]);
    if (onGoogleSignOut) onGoogleSignOut();
    console.log("User signed out successfully");
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
