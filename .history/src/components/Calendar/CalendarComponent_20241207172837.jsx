import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { gapi } from "gapi-script";

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: "Doctor's Appointment",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 11, 0),
    },
  ]);

  const [newEvent, setNewEvent] = useSTate({
    title: "",
    start: "",
    end: "",
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.end) {
      alert("Please fill out all fields");
      return;
    }
    const updatedEvents = [...events, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }];
    setEvents
  }

  const localizer = momentLocalizer(moment);

  const CLIENT_ID = "273881584331-8ri21gc1og6tfu3l1r3v7na4fkc17452.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBcYJlJvPX-KAh9VuXYbJsifqbKtLdFiUI";
  const CALENDAR_ID = "primary"; // Can be your email or 'primary'
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  useEffect(() => {
    const initClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
        });
      });
    };
    initClient();
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      loadCalendarEvents();
    });
  };

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

  return (
    <div>
      <button onClick={handleAuthClick}>
        Connect Google Calendar
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarComponent;
