import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
