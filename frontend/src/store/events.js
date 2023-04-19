import jwtFetch from "./jwt"


const RECEIVE_EVENTS = 'events/receiveEvents'
const RECEIVE_EVENT = 'events/receiveEvent'
const REMOVE_EVENTS = 'events/removeEvents'
const CLEAR_EVENTS = 'events/clearEvents'


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


export const createTripEvent = (tripId, event) => async (dispatch) => {
    let res = await jwtFetch (`/api/trips/${tripId}/events`, {
        method: 'POST',
        body: JSON.stringify(event)
    })
    let data = await res.json()
    dispatch(receiveEvent(data))
    return( data)
}

export const fetchTripEvents = tripId => async dispatch => {
    // debugger
    let res = await jwtFetch (`/api/trips/${tripId}/events`);
    let data = await res.json();
    await dispatch(receiveEvents(data))
    // return (res)
}

const initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_EVENTS:
            return {...state, ...action.payload};
        case RECEIVE_EVENT:
            return {...state, [action.payload._id]: action.payload};
        case REMOVE_EVENTS:
            const newState = {...state};
            // delete newState[action.payload]
            return {...newState};
        case CLEAR_EVENTS:
            return {};
        default:
            return state
    }
}

export default eventsReducer