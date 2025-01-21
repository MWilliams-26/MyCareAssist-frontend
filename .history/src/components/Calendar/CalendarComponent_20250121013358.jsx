import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calendar.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import { ClipLoader } from "react-spinners";
import { fetchGoogleCalendarEvents, addEventToGoogleCalendar } from "../../utils/api";

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

const initializeGoogleAuth = (CLIENT_ID, SCOPES, setAccessToken, fetchUserInfo, loadCalendarEvents) => {
  if (typeof window.google !== 'undefined') {
    return google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      prompt: 'consent', 
      callback: (tokenResponse) => {
        const token = tokenResponse.access_token;
        setAccessToken(token);
        fetchUserInfo(token);
        loadCalendarEvents(token);
      },
    });
  }
  return null;
};
const CalendarComponent = ({ onGoogleSignOut }) => {
  const loadLocalEvents = () => {
    const savedEvents = localStorage.getItem('localCalendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  }

  const [events, setEvents] = useState({
    loading: false,
    data: loadLocalEvents(),
    googleEvents: [],
    error: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const localizer = momentLocalizer(moment);
  const { CLIENT_ID, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  useEffect(() => {
    if (!googleApiLoaded) {
      loadGoogleScript(setGoogleApiLoaded);
    }

    return () => {
      const scriptElement = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
      if (scriptElement) {
        scriptElement.remove();
        setGoogleApiLoaded(false);
      }
    };
  }, []);

  useEffect(() => {
    if (googleApiLoaded) {
      const client = initializeGoogleAuth(CLIENT_ID, SCOPES, setAccessToken, fetchUserInfo, loadCalendarEvents);

      const handleGoogleSignIn = () => {
        if (client) {
          client.requestAccessToken({ prompt: "select_account" });
        }
      };

      const button = document.getElementById("google-signin-button");
      if (button) {
        button.onclick = handleGoogleSignIn;
      }
    }
  }, [googleApiLoaded]);

  const handleAuthSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem('googleToken', token);
    setAccessToken(token);
    setIsAuthenticated(true);
    fetchUserInfo(token);
    loadCalendarEvents(token);
  };

const handleSignOut = () => {
  if (accessToken && window.google?.accounts && googleApiLoaded) {
      window.google.accounts.oauth2.revoke(accessToken, () => {
          localStorage.removeItem('googleToken');
          setUserName(null);
          setEvents({ loading: false, data: [], error: null });
          setAccessToken(null);
          setIsAuthenticated(false);
          onGoogleSignOut && onGoogleSignOut();
      });
  } else {
      localStorage.removeItem('googleToken');
      setUserName(null);
      setEvents({ loading: false, data: [], error: null });
      setAccessToken(null);
      setIsAuthenticated(false);
      onGoogleSignOut && onGoogleSignOut();
  }
};

  const saveLocalEvents = (events) => {
    localStorage.setItem('localCalendarEvents', JSON.stringify(events));
  }

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
      const calendarEvents = await fetchGoogleCalendarEvents(token, CALENDAR_ID);
      console.log('Loadedd calendar events:', calendarEvents);
      setEvents({
        data: calendarEvents,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log('Error loading calendar events:', err);
      handleError(err, setEvents);
    }
  };

  const createEventOnGoogleCalendar = async (newEvent, token) => {
    try {
      const createdEvent = await addEventToGoogleCalendar(newEvent, token, CALENDAR_ID);
      setEvents((prevEvents) => ({
        ...prevEvents,
        data: [...prevEvents.data, {
          title: createdEvent.summary,
          description: createdEvent.description,
          start: new Date(createdEvent.start.dateTime),
          end: new Date(createdEvent.end.dateTime),
        }],
      }));
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const createLocalEvent = (newEvent) => {
    const formattedEvent = {
      title: newEvent.summary,
      description: newEvent.description,
      start: new Date(newEvent.start.dateTime),
      end: new Date(newEvent.end.dateTime),
      isLocal: true,
    };

    setEvents(prevEvents => {
      const updatedEvents = {
        ...prevEvents,
        data: [...prevEvents.data, formattedEvent]
      };
      saveLocalEvents(updatedEvents.data);
      return updatedEvents;
    });
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  }

  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  }

  return (
    <div className="calendar__container">
      <div className="calendar__header">
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
            <button className="calendar__link-button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="calendar__link-button" id="google-signin-button">
              Sign in with Google
            </button>
          )}
        </div>
      </div>
      {events.error && (<div className="error-message">
        <strong>Error:</strong> {events.error}
      </div>
      )}
      {isModalOpen && (
        <CreateEventFormModal
          onEventSubmit={async (newEvent) => {
            if (accessToken) {
              await createEventOnGoogleCalendar(newEvent, accessToken);
            } else {
              createLocalEvent(newEvent);
            }
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {events.loading ? (
        <div className="calendar__loader-container">
          <ClipLoader
            className="calendar__loader"
            loading={events.loading}
            aria-label="Loading Calendar Events"
          />
          <h3 className="calendar__loader-text">Loading Calendar Events...</h3>
        </div>
      ) : (
        <Calendar
          className="calendar__main"
          localizer={localizer}
          events={events.data}
          startAccessor="start"
          endAccessor="end"
          popup
          onSelectEvent={handleEventSelect}
          selectable
        />
      )}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseEventDetails}
        />
      )}
    </div>
  );
};

export default CalendarComponent;