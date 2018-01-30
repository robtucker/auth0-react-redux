import { combineEpics } from 'redux-observable'

import { authEpics } from './auth'
import { utilsEpics } from './utils'

export const auth0Epics = combineEpics(
    authEpics,
    utilsEpics,
)
