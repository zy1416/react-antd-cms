import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import Page from './Page'

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware))

ReactDOM.render(
    (
        <Provider store={store}>
            <Page/>
        </Provider>

    ),
    document.getElementById('react')
);