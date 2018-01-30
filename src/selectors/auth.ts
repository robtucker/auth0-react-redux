import { AUTH_REDUCER_KEY } from '../constants'
import { AuthState, WithAuthState } from '../interfaces'
import { Auth0UserProfile } from 'auth0-js'

interface AuthHeader {
    authorization?: string
}

export const getAuth
    = <T extends WithAuthState>(state: T): AuthState => state[AUTH_REDUCER_KEY]

export const getAuthAccessToken
    = <T extends WithAuthState>(state: T): string | undefined =>
        getAuth(state).accessToken

export const getAuthIdToken
    = <T extends WithAuthState>(state: T): string | undefined =>
        getAuth(state).idToken

export const getAuthHeaders
    = <T extends WithAuthState>(state: T, name: string = 'authorization'): AuthHeader => ({
        [name]: getAuthAccessToken(state),
    })

export const getAuthExpiresAt
    = <T extends WithAuthState>(state: T): number | null | undefined =>
        getAuth(state).expiresAt

export const getAuthProfile
    = <T extends WithAuthState, J extends Auth0UserProfile = Auth0UserProfile>(state: T):
        J | undefined => getAuth(state).profile as J
