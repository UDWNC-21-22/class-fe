import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from "./context/context";

ReactDOM.render(
  <ContextProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);
