import { Action, AuthState, AuthenticatedAction } from '../interfaces'
import * as Actions from '../actions'

const initialState: AuthState = {}

export const authReducer = (state: AuthState = initialState, action: Action) => {
    switch (action.type) {
        case Actions.AUTHENTICATED:
            return authenticated(state, action as AuthenticatedAction)
    }
    switch (action.type) {
        case Actions.LOGOUT:
            return logout(state)
    }
    return state
}

const authenticated
    = (state: AuthState, { profile, accessToken, idToken, expiresAt }: AuthenticatedAction) => ({
        ...state,
        profile,
        accessToken,
        idToken,
        expiresAt,
    })

const logout = (state: AuthState) => ({})
