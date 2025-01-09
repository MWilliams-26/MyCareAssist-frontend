import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import close from "../../assets/close.svg";
import { ClipLoader } from "react-spinners";
import { fetchGoogleCalendarEvents, addEventToGoogleCalendar } from "../../utils/api"; // Import API functions

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

  const localizer = momentLocalizer(moment);
  const { CLIENT_ID, CALENDAR_ID, SCOPES } = GOOGLE_CALENDAR_CONFIG;

  useEffect(() => {
    if (!googleApiLoaded) loadGoogleScript(setGoogleApiLoaded);

    return () => {
      const scriptElement = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
      if (scriptElement) scriptElement.remove();
    };
  }, [googleApiLoaded]);

  useEffect(() => {
    if (googleApiLoaded) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleAuthSuccess,
        scope: SCOPES,
      });

      window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
        theme: "outline",
        size: "large",
        text: "sign_in_with",
      });
    }
  }, [googleApiLoaded]);

  const saveLocalEvents =(events) => {
    localStorage.setItem('localCalendarEv')
  }

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
      const calendarEvents = await fetchGoogleCalendarEvents(token, CALENDAR_ID);
      setEvents({
        data: calendarEvents,
        loading: false,
        error: null,
      });
    } catch (err) {
      handleError(err, setEvents);
    }
  };

  const createEventOnGoogleCalendar = async (newEvent, token) => {
    try {
      await addEventToGoogleCalendar(newEvent, token, CALENDAR_ID);
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
    setAccessToken(null);
    onGoogleSignOut && onGoogleSignOut();
  };


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
