import { Auth0UserProfile } from 'auth0-js'

export interface Action {
    type: string
}

export interface AuthenticatedAction {
    type: '@@auth0/AUTHENTICATED'
    profile: Auth0UserProfile
    accessToken: string
    idToken: string
    expiresAt: number
}
