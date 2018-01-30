import * as uuid from 'uuid'
import { combineEpics, ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { Store } from 'redux'
import { replace, LOCATION_CHANGE } from 'react-router-redux'

import { REDIRECT } from '../actions'
import { RedirectAction } from '../interfaces'

export const replaceEpic =
    (action$: ActionsObservable<any>, store: Store<any>): Observable<any> =>
        action$.ofType(REDIRECT)
            .map(({ pathname }: RedirectAction) => replace(pathname))

export const locationChangeEpic =
    (action$: ActionsObservable<any>, store: Store<any>): Observable<any> =>
        action$.ofType(REDIRECT)
            .map(({ pathname }: RedirectAction) => ({
                    type: LOCATION_CHANGE,
                    payload: {
                        key: uuid(),
                        pathname,
                        hash: '',
                        search: '',
                        state: undefined,
                    },
                }))

export const utilsEpics = combineEpics(replaceEpic, locationChangeEpic)
