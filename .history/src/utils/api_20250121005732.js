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
    console.log('Fetching Google Calendar events...');
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${new Date().toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Calendar API Error:', errorData);
      throw new Error(`Failed to load calendar events: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Recieved Google Calendar events:', data);
    return data.items.map((event) => ({
      title: event.summary,
      description: event.description || "No description",
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
    }));
  } catch (error) {
    console.error('Detailed Error:', error);
    throw new Error(`Error fetching Google Calendar events: ${error.message}`);
  }
};

export const addEventToGoogleCalendar = async (newEvent, token, calendarId) => {
  const event = {
    summary: newEvent.summary,
    description: newEvent.description,
    start: {
      dateTime: newEvent.start.dateTime,
      timeZone: "UTC",
    },
    end: {
      dateTime: newEvent.end.dateTime,
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
