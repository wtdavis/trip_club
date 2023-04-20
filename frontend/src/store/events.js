import jwtFetch from "./jwt"


const RECEIVE_EVENTS = 'events/receiveEvents'
const RECEIVE_EVENT = 'events/receiveEvent'
const REMOVE_EVENTS = 'events/removeEvents'
const REMOVE_EVENT = 'events/removeEvent'
const CLEAR_EVENTS = 'events/clearEvents'
const RECEIVE_EVENT_ERRORS = 'events/receiveEventErrors'
const CLEAR_EVENT_ERRORS = 'events/clearEventErrors'

const receiveEventErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
  });
  
  export const clearEventErrors = errors => ({
      type: CLEAR_EVENT_ERRORS,
      errors
  });

  export const removeEvent = (eventId) => {
    return {
        type: REMOVE_EVENT,
        payload: eventId
    }
  }

export const receiveEvents = (events) => {
    return {
        type: RECEIVE_EVENTS,
        payload: events
    }
}

export const receiveEvent = (event) => {
    return {
        type: RECEIVE_EVENT,
        payload: event
    }
}

export const clearEvents = () => {
    return {
    type: CLEAR_EVENTS}
}




export const createTripEvent = ({tripId, event}) => async (dispatch) => {
    try{
        let res = await jwtFetch (`/api/trips/${tripId}/events`, {
            method: 'POST',
            body: JSON.stringify(event)
        })
        let data = await res.json()
        dispatch(receiveEvent(data))
        return(data)
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveEventErrors(resBody.errors));
        }
    }
}

export const fetchTripEvents = tripId => async dispatch => {
    try {
    let res = await jwtFetch (`/api/trips/${tripId}/events`);
    let data = await res.json();
    await dispatch(receiveEvents(data))
 } catch(err) {
    const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveEventErrors(resBody.errors));
        }
 }
    // return (res)
}

export const fetchEvents = () => async dispatch => {
    let res = await jwtFetch('api/events/');
    let data = await res.json();
    dispatch(receiveEvents(data))
}

export const deleteEvent = (eventId) => async dispatch => {
    let res = await jwtFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
    let data = await res.json();
    dispatch(removeEvent(eventId))
}

const nullErrors = null;

export const eventsErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};



const initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_EVENTS:
            return {...state, ...action.payload};
        case RECEIVE_EVENT:
            return {...state, [action.payload._id]: action.payload};
        case REMOVE_EVENT:
            let newState = {...state};
            delete newState.events[action.payload]
            return newState;
        case REMOVE_EVENTS:
            // const newState = {...state};
            // delete newState[action.payload]
            return {...newState};
        case CLEAR_EVENTS:
            return {};
        default:
            return state
    }
}

export default eventsReducer