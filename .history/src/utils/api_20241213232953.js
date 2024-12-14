// api.js

// Google Sign-In Initialization
export const googleSignIn = (clientId, scopes, callback) => {
  if (!window.google) {
    console.error("Google API not loaded.");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      const token = response.credential;
      callback(token);  // Send the token to the callback for further processing
    },
    scope: scopes,
  });

  window.google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    { theme: "outline", size: "large" }
  );
};

// Fetch User Info
export const fetchUserInfo = async (token) => {
  try {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user information.");
  }
};

// Load Calendar Events
export const loadCalendarEvents = async (calendarId, token) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${new Date().toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error("Failed to load calendar events: " + errorDetails.error.message);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    throw new Error(error.message || "Failed to load calendar events.");
  }
};

// Create Calendar Event
export const createCalendarEvent = async (calendarId, token, newEvent) => {
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
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
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
      throw new Error("Failed to create event in Google Calendar.");
    }

    const data = await response.json();
    return data; // Return the newly created event data
  } catch (error) {
    throw new Error(error.message || "Failed to create calendar event.");
  }
};
