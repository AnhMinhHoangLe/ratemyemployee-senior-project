import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import './index.css';
import App from './App';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins'
    ].join(','),
  },
});
ReactDOM.render(
  
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
