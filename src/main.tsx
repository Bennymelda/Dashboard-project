
import { createRoot } from 'react-dom/client'
import React from "react";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppProvider";
import './index.css'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
