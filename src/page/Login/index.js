import React from 'react'
import {connect} from 'react-redux'
import {logIn} from "../../redux/actions"
import Login from './Login'

export default connect(null, {logIn})(Login)