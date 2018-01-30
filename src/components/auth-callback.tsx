import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { func } from 'prop-types'

interface AuthCallbackProps extends RouteComponentProps<any> {
    redirectUrl?: string
}

interface AuthCallbackContext {
    handleAuthentication: (pathname?: string) => void
}

export class AuthCallback extends React.Component<AuthCallbackProps, any> {
    public static contextTypes = {
        handleAuthentication: func,
    }

    public context: AuthCallbackContext

    public componentWillMount() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.context.handleAuthentication(this.props.redirectUrl)
        }

    }
    public render(): JSX.Element | null {
        return this.props.children as any || null
    }
}