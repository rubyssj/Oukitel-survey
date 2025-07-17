import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import MobileApp from "./MobileApp";
import AdminApp from "./AdminApp";
import { isMobileDevice } from "./utils/helpers";

// Determinar qué aplicación cargar según la URL y el tipo de dispositivo
const isAdmin = window.location.pathname.includes('/admin');
const isMobile = isMobileDevice();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : (isMobile ? <MobileApp /> : <App />)}
  </StrictMode>
);