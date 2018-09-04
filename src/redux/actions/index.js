import * as LoginTypes from '../constants/LoginTypes'

export const logIn = userName => ({
    type: LoginTypes.LOG_IN,
    userName
})

export const logOut = () => ({
    type: LoginTypes.LOG_OUT
})