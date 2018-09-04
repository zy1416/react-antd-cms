import React from 'react'
import {connect} from 'react-redux'
import {logOut} from "../../redux/actions"
import Home from './Home'

const mapStateToProps = (state) => ({
    userName: state.loginUser.userName
})

const mapDispathToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut)
    }
})

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Home)