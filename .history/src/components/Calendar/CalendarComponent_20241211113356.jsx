import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { gapi } from "gapi-script";
import moment from "moment";
import CreateEventFormModal from "../CreateEventFormModal/CreateEventFormModal";
import { GOOGLE_CALENDAR_CONFIG } from "../../utils/calender.config";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";

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

  useEffect(() => {
    const initClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: SCOPES,
          })
          .then(() => {
            console.log("Google API client initialized successfully");
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
              const profile = authInstance.currentUser.get().getBasicProfile();
              setUserName(profile.getName());
              loadCalendarEvents();
            }
          }).catch((error) => {
            console.error("Error initializing Google API client:", error);
            setError("Failed to initialize Google API client");
          });
      });
    };
    initClient();
  }, []);

  const handleAuthClick = async () => {
    setLoading(true);
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance) {
        console.error("Google Auth instance not available-ensure gapi.load is initialized");
        setError("Google Auth instance not available. Give it another go")
        return;
      }
      const googleUser = await authInstance.signIn();
      const profile = googleUser.getBasicProfile();
      console.log("Signed in as:", profile.getName());
      setUserName(profile.getName());
      loadCalendarEvents();
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
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




  

  const loadCalendarEvents = () => {
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
      });
  };
  const handleSignOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUserName(null);
      setEvents([]);
      if (onGoogleSignOut) onGoogleSignOut();
      console.log('User signed out of Google Calendar');
    });
  };




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
            <button className="calendar__link-btn" onClick={handleAuthClick}>
              Connect Google Calendar
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
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

