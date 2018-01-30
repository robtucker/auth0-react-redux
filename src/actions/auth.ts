import { AuthenticatedAction } from '../interfaces'
import { Auth0UserProfile } from 'auth0-js'

export const AUTHENTICATED = '@@auth0/AUTHENTICATED'
export const LOGOUT = '@@auth0/LOGOUT'

export const authenticated
    = (profile: Auth0UserProfile,
       accessToken: string,
       idToken: string,
       expiresAt: number): AuthenticatedAction => ({
            type: AUTHENTICATED,
            profile,
            accessToken,
            idToken,
            expiresAt,
        })

export const logout = () => ({
    type: LOGOUT,
})