import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";
import { ClipLoader } from "react-spinners";
import { useGoogleLogin } from '@react-oauth/google';

const handleError = (error, setEvents) => {
  console.error(error);
  setEvents((prevEvents) => ({
    ...prevEvents,
    loading: false,
    error: error.message || "An unexpected error occurred.",
  }));
};

const loadGoogleScript = (setGoogleApiLoaded) => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.onload = () => setGoogleApiLoaded(true);
  document.body.appendChild(script);
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
  const [accessToken, setAccessToken] = useState(null);

  const { CLIENT_ID, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  const { login, googleUser, isAuthenticated } = useGoogleLogin({
    onSuccess: (response) => {
      const token = response.access_token;
      setAccessToken(token);
      fetchUserInfo(token);
      loadCalendarEvents(token);
    },
    scope: SCOPES,
  });

  useEffect(() => {
    if (googleUser && isAuthenticated) {
      fetchUserInfo(googleUser.token);
    }
  }, [googleUser, isAuthenticated]);

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
        const errorDetails = await response.json();
        throw new Error("Failed to load calendar events. " + (errorDetails.error.message || ""));
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
    setUserName(null);
    setEvents({ loading: false, data: [], error: null });
    setAccessToken(null);
    onGoogleSignOut && onGoogleSignOut();
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <h2 className="calendar__title">My Calendar</h2>
        {userName && <div className="calendar__username">Welcome, {userName}!</div>}
        <div className="calendar__buttons">
          <button
            className="calendar__btn"
            onClick={() => setIsModalOpen(true)}
            disabled={isModalOpen || events.loading}
          >
            Create Event
          </button>
          {userName ? (
            <button className="calendar__link-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => login()} className="calendar__btn">Sign In with Google</button>
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
              disabled={events.loading}
              aria-label="Close modal"
            >
              <img src={close} alt="close" className="modal__close-btn" />
            </button>
            <CreateEventFormModal
              onEventSubmit={async (newEvent) => {
                await createEventOnGoogleCalendar(newEvent, accessToken);
                setIsModalOpen(false);
              }}
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
