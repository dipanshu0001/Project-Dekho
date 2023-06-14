import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from './MiuiTheme.js'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContextProvide from './Common_function_context/ContextProvide';
import { ThemeProvider as materialThemeProvider } from "@material-tailwind/react";
import { SocketProvider } from './Common_function_context/SocketProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <materialThemeProvider>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
          <ContextProvide>
          <SocketProvider>

            <App />
          </SocketProvider>

          </ContextProvide>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </materialThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
