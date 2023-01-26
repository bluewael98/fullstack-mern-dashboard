import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "state"   // reason we can import directly is because our base url is set to src in jsconfig 
import { Provider } from 'react-redux'; // wraps top level components of store, so that all child components can access store and dispatch actions via react context api
import { setupListeners } from '@reduxjs/toolkit/query'; // add listeners to the store whenever specific slices of state changes
import { api } from 'state/api'; // import api here so app can handle api calls through middleware

const store = configureStore ({  // configure store with set of options
  reducer: {    // first option is a reducer
    global: globalReducer,  // first reducer handles the applications global state
    [api.reducerPath]: api.reducer,  // handles state related to api calls
  },
  middleware: (getDefault) => getDefault().concat(api.middleware) // add api to the arrray of middlewares in store
})
setupListeners(store.dispatch); 

const root = ReactDOM.createRoot(document.getElementById('root')); // rendering app to the DOM
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
