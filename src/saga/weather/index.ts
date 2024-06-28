import { weatherBasedOnCityFailure, weatherBasedOnCityRequest, weatherBasedOnCityResponse } from 'reducer'
import { type ForkEffect, takeLatest, put } from 'redux-saga/effects'

import { API } from 'routes/apiRoutes'
import { apiCall, defaultHeader } from 'utils/helpers'

function * cityWeather (requestDetails: any): Generator<any, void, any> {
  try {
    const headers = defaultHeader()
    const response = yield apiCall({ headers, ...API.weatherCity, params: requestDetails.payload })
    if (response.status === 200) {
      yield put(weatherBasedOnCityResponse(response.data))
    } else {
      yield put(weatherBasedOnCityFailure("Couldn't retrieve users"))
    }
  } catch (error) {
    console.log(error)
  }
}

export function * takeWeatherRequest (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(weatherBasedOnCityRequest, cityWeather)
}
