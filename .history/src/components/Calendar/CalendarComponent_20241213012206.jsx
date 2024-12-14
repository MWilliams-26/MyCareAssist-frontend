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
  const [events, setEvents] = useState({
    loading: false,
    data: [
      {
        title: "Doctor's Appointment",
        description: "Annual checkup",
        start: new Date(2024, 10, 29, 10, 0),
        end: new Date(2024, 11, 29, 10, 0),
      },
    ],
    error: null,
  });
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  const { CLIENT_ID, API_KEY, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  // Google Identity Services (GIS) initialization
  useEffect(() => {
    if (isGoogleScriptLoaded) {
      // Initialize Google Sign-In once the script is loaded
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleAuthSuccess,
      });

      // Render Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          text: "sign_in_with",
        }
      );
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => setIsGoogleScriptLoaded(true); // Set state when script is loaded
      document.body.appendChild(script);
    }

    // Cleanup the script when the component unmounts
    return () => {
      const scriptElement = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [isGoogleScriptLoaded]);

  const handleAuthSuccess = (response) => {
    const accessToken = response.credential;

    // Load Google Calendar events using the access token
    loadCalendarEvents(accessToken);

    // Get user information from Google Identity API
    fetchUserInfo(accessToken);
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await userInfoResponse.json();
      setUserName(data.name || data.email);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setEvents({ ...events, error: "Failed to fetch user info." });
    }
  };

  const loadCalendarEvents = async (accessToken) => {
    setEvents({ ...events, loading: true });
    try {
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMin=${new Date().toISOString()}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      const loadedEvents = data.items.map((event) => ({
        title: event.summary,
        description: event.description || "No description",
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents({ data: loadedEvents, loading: false, error: null });
    } catch (err) {
      console.error("Error loading calendar events:", err);
      setEvents({ ...events, loading: false, error: "Failed to load calendar events" });
    }
  };

  const handleSignOut = () => {
    setUserName(null);
    setEvents({ loading: false, data: [], error: null });
    onGoogleSignOut && onGoogleSignOut();
    console.log("User signed out");
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <h2 className="calendar__title">My Calendar</h2>
        {userName && <div>Welcome, {userName}!</div>}
        <div className="calendar__buttons">
          <button 
            className="calendar__btn" 
            onClick={() => setIsModalOpen(true)} 
            disabled={isModalOpen}
          >
            Create Event
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

      {events.error && <div className="error-message">{events.error}</div>}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
              <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal
              onEventSubmit={(newEvent) => {
                setEvents((prevEvents) => ({ data: [...prevEvents.data, newEvent], loading: false, error: null }));
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {events.loading ? (
        <div className="loading-message">Loading events...</div>
      ) : (
        <>
          {events.data.length === 0 && !events.error && (
            <div className="no-events-message">No events to display. Please add some events!</div>
          )}
          <Calendar
            localizer={localizer}
            events={events.data}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100% - 80px)" }}
          />
        </>
      )}
    </div>
  );
};

export default CalendarComponent;
