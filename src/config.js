// src/config.js
const URL = import.meta.env.MODE === "production"
  ? import.meta.env.VITE_BACKEND_URL
  : import.meta.env.VITE_APP_URL;

export default URL;
