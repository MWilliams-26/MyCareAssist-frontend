// Save user profile to localStorage
export const createProfile = (profileData) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      resolve(profileData);
    } catch (error) {
      reject(error);
    }
  });
};

// Get user profile from localStorage
export const getProfile = () => {
  return new Promise((resolve, reject) => {
    try {
      const profile = localStorage.getItem('userProfile');
      resolve(profile ? JSON.parse(profile) : null);
    } catch (error) {
      reject(error);
    }
  });
};

// Save doctors data in localStorage
export const addDoctor = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const existingDoctors = localStorage.getItem('doctors');
      const doctorsList = existingDoctors ? JSON.parse(existingDoctors) : [];
      
      const newDoctor = {
        _id: Date.now().toString(),
        ...data,
      };

      const updatedDoctorsList = [...doctorsList, newDoctor];
      localStorage.setItem('doctors', JSON.stringify(updatedDoctorsList));

      resolve({
        newDoctor,
        doctorsList: updatedDoctorsList,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Get doctors data from localStorage
export const getDoctors = () => {
  return new Promise((resolve, reject) => {
    try {
      const doctors = localStorage.getItem('doctors');
      resolve(doctors ? JSON.parse(doctors) : []);
    } catch (error) {
      reject(error);
    }
  });
};


export const fetchGoogleCalendarEvents = async (token, calendarId) => {
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
      throw new Error("Failed to load calendar events.");
    }

    const data = await response.json();
    return data.items.map((event) => ({
      title: event.summary,
      description: event.description || "No description",
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
    }));
  } catch (error) {
    throw new Error(`Error fetching Google Calendar events: ${error.message}`);
  }
};

// Add an event to Google Calendar
export const addEventToGoogleCalendar = async (newEvent, token, calendarId) => {
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
    return data;
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};
