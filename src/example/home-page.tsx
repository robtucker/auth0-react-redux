import * as React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { withAuthentication } from '../components'
import { getAuthProfile, getAuthHeaders } from '../selectors'
import { logout } from '../actions'

/**
 * Profile page displays the user's profile
 */
interface UserProfileComponentProps {
    profile: any
    authHeaders: any
    logout: () => void
}

/**
 * Profile page presentational component
 */
class UserProfileComponent extends React.Component<UserProfileComponentProps, any> {

    public static contextTypes = {
        logout: func,
    }

    public render() {
        const { profile } = this.props

        return (
            <div>
                <h2>You are successfully logged in</h2>
                <div>{profile.nickname}</div>
                <div>{profile.email}</div>
                <img width={50} src={profile.picture} alt=""/>
                <pre>
                    {JSON.stringify(profile, null, 4)}
                </pre>
                <button onClick={this.handleLogout}>logout</button>
            </div>
        )
    }
    private handleLogout = () => {
        this.props.logout()
    }

}

const mapStateToProps = (state: any) => ({
    profile: getAuthProfile(state),
    authHeaders: getAuthHeaders(state),
})

const mapDispatchToProps = {
    logout,
}

export const UserProfile =
    withAuthentication((connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent)))

/**
 * Higher order component wrapping the profile page
 * Ensures authentication or redirects to the login page
 */
// export const HomePage = authMiddleware(UserProfile)

export const HomePage = () =>
    <div>
        <UserProfile />
    </div>
