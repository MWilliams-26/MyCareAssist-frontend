import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";

// Helper function to handle errors
const handleError = (error, setEvents) => {
  console.error(error);
  setEvents((prevEvents) => ({
    ...prevEvents,
    loading: false,
    error: error.message || "Something went wrong.",
  }));
};

const CalendarComponent = ({ onGoogleSignOut }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [events, setEvents] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // Store access token here

  const { CLIENT_ID, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  // Load Google Sign-In script
  useEffect(() => {
    if (!googleApiLoaded) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => setGoogleApiLoaded(true);
      document.body.appendChild(script);
    }

    return () => {
      const scriptElement = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [googleApiLoaded]);

  useEffect(() => {
    if (googleApiLoaded) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleAuthSuccess,
        scope: SCOPES,  // Ensure this scope matches the Calendar API scope
      });

      window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
        theme: "outline",
        size: "large",
        text: "sign_in_with",
      });
    }
  }, [googleApiLoaded]);

  const handleAuthSuccess = (response) => {
    const token = response.credential;
    setAccessToken(token);
    fetchUserInfo(token);
    loadCalendarEvents(token);
  };

  const fetchUserInfo = async (token) => {
    try {
      const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await userInfoResponse.json();
      setUserName(data.name || data.email);
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const loadCalendarEvents = async (token) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      loading: true,
    }));

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMin=${new Date().toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load calendar events");
      }

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        const loadedEvents = data.items.map((event) => ({
          title: event.summary,
          description: event.description || "No description",
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));

        setEvents({
          data: loadedEvents,
          loading: false,
          error: null,
        });
      } else {
        setEvents({
          ...events,
          loading: false,
          error: "No events found.",
        });
      }
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const createEventOnGoogleCalendar = async (newEvent, token) => {
    const event = {
      summary: newEvent.title,
      description: newEvent.description,
      start: {
        dateTime: newEvent.start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: newEvent.end.toISOString(),
        timeZone: "UTC",
      },
    };

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(event),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create event in Google Calendar");
      }
      const data = await response.json();
      console.log("Event created:", data);
      // Update local events after creation
      setEvents((prevEvents) => ({
        data: [
          ...prevEvents.data,
          {
            title: newEvent.title,
            description: newEvent.description,
            start: newEvent.start,
            end: newEvent.end,
          },
        ],
        loading: false,
        error: null,
      }));
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const handleSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
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
            <div id="google-signin-button"></div> // Google Sign-In button will be rendered here
          )}
        </div>
      </div>

      {events.error && <div className="error-message">{events.error}</div>}

      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="create-event-modal"
          aria-hidden={!isModalOpen}
        >
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              disabled={events.loading}
            >
              <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal
              onEventSubmit={async (newEvent) => {
                await createEventOnGoogleCalendar(newEvent, accessToken); // Pass the access token here
                setIsModalOpen(false); // Close the modal after event is created
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {events.loading ? (
        <div className="loading-message">Loading events...</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events.data}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100% - 80px)" }}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
