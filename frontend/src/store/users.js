import jwtFetch from "./jwt"


const RECEIVE_USERS = '/api/RECEIVE_USERS'

const receiveUsers = (users) => {
    return ({
        type: RECEIVE_USERS,
        users
    })
}

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let nextState = { ...state }

    switch(action.type) {
        case RECEIVE_USERS:
            nextState = {...state, ...action.users}
            return nextState
        default:
            return state
    }
}

export const fetchAllUsers = () => async (dispatch) => {
    const res = await jwtFetch('/api/users/')

    const data = await res.json()
    dispatch(receiveUsers(data))
}


export default usersReducer