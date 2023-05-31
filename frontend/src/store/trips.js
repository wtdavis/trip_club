import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
import { fetchUserByEmail } from './users';

const RECEIVE_TRIPS = "trips/RECEIVE_TRIPS";
const RECEIVE_TRIP = "trips/RECEIVE_TRIP";
const RECEIVE_USER_TRIPS = "trips/RECEIVE_USER_TRIPS";
const RECEIVE_NEW_TRIP = "trips/RECEIVE_NEW_TRIP";
const RECEIVE_TRIP_ERRORS = "trips/RECEIVE_TRIP_ERRORS";
const CLEAR_TRIP_ERRORS = "trips/CLEAR_TRIP_ERRORS";
const SET_CURRENT_TRIP = "trips/setCurrentTrip"
const CLEAR_CURRENT_TRIP = "trips/clearCurrentTrip"
const REMOVE_TRIP = "trips/REMOVE_TRIP";

const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
});

const receiveUserTrips = trips => ({
  type: RECEIVE_USER_TRIPS,
  trips
});

const receiveNewTrip = trip => ({
  type: RECEIVE_NEW_TRIP,
  trip
});

export const setCurrentTrip = trip => {
  return {
    type: SET_CURRENT_TRIP,
    trip
  }
}

export const removeTrip = trip => {
  return {
    type: REMOVE_TRIP,
    trip
  }
}

export const clearCurrentTrip = trip => {
  return {
    type: CLEAR_CURRENT_TRIP,
    trip
  }
}

const receiveErrors = errors => ({
  type: RECEIVE_TRIP_ERRORS,
  errors
});

export const clearTripErrors = errors => ({
    type: CLEAR_TRIP_ERRORS,
    errors
});

export const getTrips = state => {
  return state?.trips.all ? Object.values(state.trips.all) : [];
};

// export const getUserTrips = userId => state => {
//   return state?.trips ? state.trips[userId] : null;
// }

export const fetchTrips = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/trips');
    const trips = await res.json();
    dispatch(receiveTrips(trips));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchTrip = id => async dispatch => {
  try {
    const res = await jwtFetch (`/api/trips/${id}`);
    const trip = await res.json();
    dispatch(receiveTrip(trip));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const addCollaborator = (trip, collaborator) => async (dispatch) => {
    trip.collaborators = trip.collaborators.concat(collaborator)
    let collabs = []
    trip.collaborators.forEach(collaborator => {
    if (collaborator instanceof(Object)) {
     collabs = collabs.concat(collaborator._id) 
    } else {
      collabs = collabs.concat(collaborator)
    }

   })

   trip.collaborators = collabs 
  //  debugger

   let data = new FormData()
   let keys = Object.keys(trip)
  //  debugger
   for (let i=0;i<keys.length;i++){
     if (trip[keys[i]] instanceof(Array)) {
       data.append(`${keys[i]}`, JSON.stringify(trip[keys[i]]))
      } else { 
        data.append(`${keys[i]}`, trip[keys[i]])
      }
    }
    dispatch(updateTrip(data))
    .then(res => { 
      debugger
      dispatch(setCurrentTrip(res))
    })
}

export const removeCollaborator = (trip, collaborator) => async (dispatch) => {
  let revisedCollaborators = [...trip.collaborators]
  revisedCollaborators = revisedCollaborators.filter(collaborator)
  trip.collaborators = revisedCollaborators
  return dispatch(updateTrip(trip))
}

export const updateTrip = (formData) => async (dispatch) => {
debugger
  let tripId = formData.get('_id')
 
  try {
    const res = await jwtFetch(`/api/trips/${tripId}`, {
      method: 'PATCH',
      body: formData
    })
    const updatedTrip = await res.json()
    // debugger
    dispatch(receiveTrip(updatedTrip))
    return updatedTrip
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
}

export const fetchUserTrips = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/trips/user/${id}`);
    const trips = await res.json();
    dispatch(receiveUserTrips(trips));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteTrip = data => async dispatch => {
  // debugger
  const res = await jwtFetch(`/api/trips/${data._id}`, {
    method: 'DELETE'
  })
  dispatch(removeTrip(data))
}

export const composeTrips = (formData) => async dispatch => {
  debugger

  let trip;
  try {
    const res = await jwtFetch('/api/trips/', {
      method: 'POST',
      body: formData
      // body: JSON.stringify(data)
    });
    // debugger
    trip = await res.json();
    dispatch(receiveNewTrip(trip));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
  return trip
};

const nullErrors = null;

export const tripErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_TRIP_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TRIP:
    case CLEAR_TRIP_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const tripsReducer = (state = { all: {}, user: {}, new: undefined, current: null }, action) => {
  switch(action.type) {
    case RECEIVE_TRIP :
      return { ...state, edit: action.trip }
    case RECEIVE_TRIPS:
      return { ...state, all: action.trips, new: undefined};
    case RECEIVE_USER_TRIPS:
      return { ...state, user: action.trips, new: undefined};
    case RECEIVE_NEW_TRIP:
      return { ...state, new: action.trip};
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    case SET_CURRENT_TRIP:
      return {...state, current: action.trip};
    case CLEAR_CURRENT_TRIP:
      return {...state, current: null}
    case REMOVE_TRIP:
      // debugger
      let nextState = { ...state };
      let idxOfDeletingTrip = nextState.all.indexOf(action.trip)
      if (idxOfDeletingTrip > -1) {
        nextState.all.splice(idxOfDeletingTrip, 1)
      }
      // debugger
      return { ...nextState, current: null, edit: null, new: undefined }
    default:
      return state;
  }
};

export default tripsReducer;
