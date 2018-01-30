import * as React from 'react'
import { connect } from 'react-redux'
import { func, bool } from 'prop-types'
import { withRouter } from 'react-router'
import { AuthWrapper as Component } from '../components'
import { AuthWrapperProps, AuthWrapperComponentProps } from '../interfaces'
import { getAuthProfile } from '../selectors'

interface AuthWrapperContext {
    login: () => void
    isAuthenticated: () => boolean
}

export class AuthWrapperComponent extends React.Component<AuthWrapperComponentProps, {}> {
    public static contextTypes = {
        login: func,
        isAuthenticated: func,
    }

    public context: AuthWrapperContext

    private access: boolean = false

    constructor(props: any) {
        super(props)
    }

    public componentWillMount() {
        if (this.shouldRedirect()) {
            this.context.login()
        }
    }

    public componentWillUpdate() {
        if (this.shouldRedirect()) {
            this.context.login()
        }
    }

    public render(): JSX.Element | null {
        if (this.props.shouldBeAuthenticated && !this.props.profile) return null
        return this.props.children as JSX.Element
    }

    private shouldRedirect = () =>
        this.props.shouldBeAuthenticated && !this.context.isAuthenticated()

}
const mapStateToProps = (state: any, ownProps: AuthWrapperProps) => ({
    ...ownProps,
    profile: getAuthProfile(state),
})

const mapDispatchToProps = {}

export const AuthWrapper = connect(mapStateToProps, mapDispatchToProps)(AuthWrapperComponent)

export const withAuthentication = (WrappedComponent: any, redirectUrl: string | null = null) => {
    const WrappedComponentWithRouter = withRouter(WrappedComponent)
    return () => (
        <AuthWrapper shouldBeAuthenticated={true}>
            <WrappedComponentWithRouter />
        </AuthWrapper>
    )
}

export const withoutAuthentication = (WrappedComponent: any, redirectUrl: string | null = null) => {
    const WrappedComponentWithRouter = withRouter(WrappedComponent)
    return () => (
        <AuthWrapper shouldBeAuthenticated={false}>
            <WrappedComponentWithRouter />
        </AuthWrapper>
    )
}
