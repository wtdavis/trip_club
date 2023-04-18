import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import {Wrapper} from '@googlemaps/react-wrapper';


let store = configureStore({});

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
      <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
        <Root />
      </Wrapper>
    </React.StrictMode>,
  document.getElementById('root')
);

