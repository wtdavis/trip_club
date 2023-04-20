import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { tweetErrorsReducer } from './tweets';
import { eventsErrorsReducer } from './events';

export default combineReducers({
  session: sessionErrorsReducer,
  tweets: tweetErrorsReducer,
  events: eventsErrorsReducer
});
