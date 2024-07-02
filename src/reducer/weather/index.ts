import { createSlice } from '@reduxjs/toolkit'
import { type IActionWithPayload } from 'types'

const initialState: any = {
  isFetching: false,
  error: '',
  weatherData: null
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherBasedOnCityRequest: (state: any, action: IActionWithPayload<any>) => {
      state.isFetching = true
      state.error = ''
    },
    weatherBasedOnCityResponse: (state: any, action: IActionWithPayload<any>) => {
      state.isFetching = false
      state.weatherData = action.payload
    },
    weatherBasedOnCityFailure: (state: any, action: IActionWithPayload<any>) => {
      state.isFetching = false
      state.error = action.payload.error
    }
  }
})

export const {
  weatherBasedOnCityRequest,
  weatherBasedOnCityResponse,
  weatherBasedOnCityFailure
} = weatherSlice.actions

export const weatherReducer = weatherSlice.reducer
