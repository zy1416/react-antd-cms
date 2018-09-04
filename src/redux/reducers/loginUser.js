import {LOG_IN, LOG_OUT} from '../constants/LoginTypes'

const initState = {
    userName: null
}

export default function loginUser(state = initState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...initState,
                userName: action.userName
            }
        case LOG_OUT:
            return {userName: null}
        default:
            return state
    }

}