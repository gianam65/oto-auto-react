import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleReactLightBox from 'simple-react-lightbox'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SimpleReactLightBox>
        <App />
      </SimpleReactLightBox>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
