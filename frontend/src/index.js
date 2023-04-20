import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import {Wrapper} from '@googlemaps/react-wrapper';
import './reset.css';
import './index.css';
import App from './App';
import configureStore from './store/store';



let store = configureStore({});








function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
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

