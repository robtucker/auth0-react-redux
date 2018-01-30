# Auth0 Redux

React components for authenticating with auth0

### Installation

```
npm install auth0-react-redux
```

### Usage

1. Ensure the authReducer has been added to your rootReducer

```tsx
import { AUTH_REDUCER_KEY, authReducer } from 'auth0-react-redux'

const rootReducer = combineReducers({
    [AUTH_REDUCER_KEY]: authReducer,
    // other reducers
})

const store = createStore(rootReducer)
```

2. Wrap your app with `<AuthProvider>`, and ensure there is a valid callback route. This is the route that auth0 will redirect to after a successful login, and the path must be saved in the allowed callbacks section inside your auth0 client.

```tsx
import { Provider } from 'react-redux'
import { AuthProvider, AuthCallback } from 'auth0-react-redux'

const authConfig = {
    domain: 'foobar.auth0.com',
    clientID: 'foobar',
    callbackURL: '/',
}

ReactDOM.render(
    <Provider>
        <AuthProvider authOptions={authConfig}>
            <Route exact path="/callback" component={AuthCallback} />
        </AuthProvider>
    </Provider>
)
```

### HOC for authenticated routes

Two Higher Order Components have been provided to ensure your users are logged in/out.

```tsx
type withAuthentication: (WrappedComponent: any, redirectUrl: string | null = null) => JSX.Element
type withoutAuthentication: (WrappedComponent: any, redirectUrl: string | null = null) => JSX.Element
```

These can be used as follows:

```tsx
import { withoutAuthentication, withoutAuthentication } from 'auth0-react-redux'

const ProfilePage = withAuthentication(() => (
    <div>You are logged in</div>
))

const LandingPage = withoutAuthentication(() => (
    <div>You are logged out</div>
))
```

If the user is not logged in they will be redirected to auth0.
