import {LOG_IN, LOG_OUT} from '../constants/ActionTypes'

export const logIn = userName => ({
    type: LOG_IN,
    userName
})

export const logOut = () => ({
    type: LOG_OUT
})
