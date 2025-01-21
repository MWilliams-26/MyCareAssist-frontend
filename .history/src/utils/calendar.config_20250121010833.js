export const GOOGLE_CALENDAR_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  CALENDAR_ID: "primary",
  SCOPES: import.meta.env.VITE_GOOGLE_CALENDAR_SCOPES,
};


VITE_GOOGLE_CALENDAR_SCOPES="https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
