import * as uuid from 'uuid'
import { replace, LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'

import { RedirectAction } from '../interfaces'

export const REDIRECT = '@@auth0/REDIRECT'

export const redirect = (pathname: string): RedirectAction => ({
    type: REDIRECT,
    pathname,
})