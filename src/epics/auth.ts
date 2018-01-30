
import { combineEpics, ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { Store } from 'redux'

import {
    LOCAL_STORAGE_EXPIRES_AT_KEY,
    LOCAL_STORAGE_ID_TOKEN_KEY,
} from '../constants'
import { LOGOUT } from '../actions'

export const clearLocalStorage =
    (action$: ActionsObservable<any>, store: Store<any>): Observable<any> =>
        action$.ofType(LOGOUT)
            .map(action => {
                localStorage.removeItem(LOCAL_STORAGE_EXPIRES_AT_KEY)
                localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN_KEY)
                return ({ type: 'NOOP '})
            })

export const authEpics = combineEpics(clearLocalStorage)