import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { eventsErrorsReducer } from './events';
import { tripErrorsReducer } from './trips';

export default combineReducers({
  session: sessionErrorsReducer,
  events: eventsErrorsReducer,
  trips: tripErrorsReducer
});
