import {combineReducers} from 'redux'

import loginUser from './loginUser'
import order from './order'

export default combineReducers({
    loginUser,
    order
})