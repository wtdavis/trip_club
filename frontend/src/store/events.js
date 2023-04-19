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


export const fetchEvents = async (eventsList) => {
    let res = await jwtFetch('/api/'

    )
}

const initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_EVENTS:
            return action.payload;
        case RECEIVE_EVENT:
            return {...state, [action.payload._id]: action.payload};
        case REMOVE_EVENTS:
            const newState = {...state};
            delete newState[action.payload]
            return {...newState};
        case CLEAR_EVENTS:
            return {};
        default:
            return state
    }
}

export default eventsReducer