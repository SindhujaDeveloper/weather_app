import { type AllEffect, type ForkEffect, all, fork } from 'redux-saga/effects'
import { takeWeatherRequest } from 'saga'
import { takeAuthRequest } from 'saga/auth'

function * rootSaga (): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(takeAuthRequest),
    fork(takeWeatherRequest)
  ])
}

export { rootSaga }
