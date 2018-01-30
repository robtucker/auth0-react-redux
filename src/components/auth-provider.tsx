import * as React from 'react'
import { promisifyAll } from 'bluebird'
import { connect } from 'react-redux'
import { func, bool } from 'prop-types'
import { WebAuth, Authentication, AuthOptions, Auth0UserProfile, Auth0DecodedHash } from 'auth0-js'

import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_ID_TOKEN_KEY,
    LOCAL_STORAGE_EXPIRES_AT_KEY,
} from '../constants'

import { AuthProviderComponentProps, AuthProviderProps } from '../interfaces'
import { authenticated, redirect, logout } from '../actions'

interface WebAuthAsync extends WebAuth {
    parseHashAsync: () => Promise<Auth0DecodedHash>
    client: AuthenticationAsync
}

interface AuthenticationAsync extends Authentication {
    userInfoAsync: (accessToken: string) => Auth0UserProfile
}

export interface AuthProviderChildContext {
    login: () => void
    handleAuthentication: () => void
    isAuthenticated: () => boolean
}

export class AuthProviderComponent extends React.Component<AuthProviderComponentProps, {}> {

    public static childContextTypes = {
        login: func,
        handleAuthentication: func,
        isAuthenticated: func,
    }

    private auth0: WebAuthAsync

    public async componentWillMount() {
        const { authOptions } = this.props

        this.auth0 = promisifyAll(new WebAuth({
            responseType: 'token id_token',
            scope: 'openid profile',
            redirectUri: `${window.location.origin}${this.props.callbackUrl || '/callback'}`,
            ...authOptions,
        })) as WebAuthAsync

        this.auth0.client = promisifyAll(this.auth0.client) as AuthenticationAsync

        if (this.isAuthenticated()) {
            try {
                await this.setProfile()
            } catch (err) {
                console.error('Failed to set auth0 profile', err)
                this.props.logout()
            }
        }
    }

    public getChildContext(): AuthProviderChildContext {
        return {
            login: this.handleLogin,
            handleAuthentication: this.handleAuthentication,
            isAuthenticated: this.isAuthenticated,
        }
    }

    public render(): JSX.Element {
        return this.props.children as JSX.Element
    }

    private setSession(authResult: Auth0DecodedHash) {
        // console.log('authResult', authResult)
        if (!authResult
            || !authResult.accessToken
            || !authResult.expiresIn
            || !authResult.idToken) throw new Error('invalid authResult')

        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((new Date().getTime() / 1000) + authResult.expiresIn)

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, `${authResult.accessToken}`)
        localStorage.setItem(LOCAL_STORAGE_ID_TOKEN_KEY, `${authResult.idToken}`)
        localStorage.setItem(LOCAL_STORAGE_EXPIRES_AT_KEY, expiresAt)
    }

    private handleAuthentication = async (pathname: string = '/') => {
        const authResult = await this.auth0.parseHashAsync()
        try {
            // console.log('pathname', pathname)
            this.setSession(authResult)
            await this.setProfile()
            console.log('redirecting...')
            this.props.redirect(pathname)
        } catch (err) {
            // console.error('errrr', err)
            this.props.logout()
        }
    }

    private handleLogin = () => {
        this.auth0.authorize()
    }

    private isAuthenticated = () => {
        const expiresAt = this.getExpiresAt()
        if (!expiresAt) return false
        return new Date().getTime() < expiresAt
    }

    private getAccessToken(): string | null {
        return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    }

    private getIdToken(): string | null {
        return localStorage.getItem(LOCAL_STORAGE_ID_TOKEN_KEY)
    }

    private getExpiresAt(): number | null {
        const expiresAtRaw = localStorage.getItem(LOCAL_STORAGE_EXPIRES_AT_KEY)
        return JSON.parse(`${expiresAtRaw}`) * 1000
    }

    private setProfile = async () => {
        const accessToken = this.getAccessToken()
        if (!accessToken) throw new Error('no access token')

        const idToken = this.getIdToken()
        if (!idToken) throw new Error('no id token')

        const expiresAt = this.getExpiresAt()
        if (!expiresAt) throw new Error('no expires at')
        const profile = await this.auth0.client.userInfoAsync(accessToken)
        console.log('userInfo', profile)

        this.props.authenticated(
            profile,
            accessToken,
            idToken,
            expiresAt,
        )

        return profile
    }
}

const mapStateToProps = (state: any, ownProps: AuthProviderProps) => ({
    ...ownProps,
})

const mapDispatchToProps = {
    redirect,
    authenticated,
    logout,
}

export const AuthProvider = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthProviderComponent as any)
