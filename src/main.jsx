import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TropasProvider } from "./TropasProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TropasProvider>
      <App />
    </TropasProvider>
  </React.StrictMode>
);
