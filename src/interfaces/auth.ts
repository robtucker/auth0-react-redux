import { AuthOptions, Auth0UserProfile } from 'auth0-js'

export interface AuthWrapperComponentProps extends AuthWrapperProps {
    profile: Auth0UserProfile | undefined
}

export interface AuthWrapperProps  {
    shouldBeAuthenticated: boolean
}

export interface AuthProviderComponentProps extends AuthProviderProps {
    redirect: (location: any, state?: any) => void
    logout: () => void
    authenticated: (
        profile: Auth0UserProfile,
        accessToken: string,
        idToken: string,
        expiresAt: number,
     ) => void
}

export interface AuthProviderProps {
    authOptions: AuthOptions
    callbackUrl?: string
}

export interface JwtTokenData {
    aud: string
    exp: number
    iat: number
    iss: string
    sub: string
}

export interface WithAuthState {
    '@@auth0': AuthState
}

export interface AuthState {
    accessToken?: string
    idToken?: string
    profile?: Auth0UserProfile
    expiresAt?: number
}
