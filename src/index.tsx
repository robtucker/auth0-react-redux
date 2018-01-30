import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Route, withRouter, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { AuthOptions } from 'auth0-js'
import { default as thunk } from 'redux-thunk'
import { config } from './config'
import 'rxjs'

// top level components
import { authReducer } from './reducers';
import { HomePage, UserProfile } from './example'
import { AUTH_REDUCER_KEY } from './constants'
import { AuthProvider, AuthCallback } from './components'
import { auth0Epics } from './epics'

const history = createHistory()
const routeMiddleware = routerMiddleware(history)

const authConfig: AuthOptions = {
    domain: config.AUTH0_DOMAIN,
    clientID: config.AUTH0_ID,
    audience: config.AUTH0_AUDIENCE,
}

const rootEpic = combineEpics(
    auth0Epics,
)
const epicMiddleware = createEpicMiddleware(rootEpic)

const store = createStore(
    combineReducers({
        [AUTH_REDUCER_KEY]: authReducer,
    }),
    composeWithDevTools(
        applyMiddleware(
            routeMiddleware,
            epicMiddleware,
            thunk,
        ),
    ),
);

const mount = document.createElement('div')

document.body.appendChild(mount)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <AuthProvider authOptions={authConfig}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/callback" component={AuthCallback} />
                    </Switch>
                </ConnectedRouter>
            </AuthProvider>
        </Provider>,
        mount,
    )
})

/* tslint:enable */
