import '../public/index.css';

import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import store from './store';

const app = document.getElementById("app");
const root = createRoot(app); 

root.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
);