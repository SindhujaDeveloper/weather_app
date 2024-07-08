import React, { useEffect } from 'react'
import 'assets/stylesheets/dashboard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { weatherBasedOnCityRequest } from 'reducer'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { config } from 'layout/config'

export interface ICityListState {
  State: string
  City: string
  Lat: number
  Long: number
}

const MapComponent: React.FC = () => {
  const dispatch = useDispatch()

  const { weatherData } = useSelector((state: any) => state.weather)

  useEffect(() => {
    dispatch(weatherBasedOnCityRequest({
      lat: 13.07,
      lon: 80.28,
      appid: '015e4eaea9c137865941644a12e60199'
    }))
  }, [])

  console.log(config.googleMapsApiKey, 'config.googleMapsApiKey')
  return (
    <div className='dashboard-container'>
      {config.googleMapsApiKey !== ''
        ? <APIProvider apiKey={config.googleMapsApiKey}>
        <Map
          defaultZoom={5}
          defaultCenter={{ lat: 13.07, lng: 80.28 }}
          onClick={(ev: any) => {
            dispatch(weatherBasedOnCityRequest({
              lat: ev.detail.latLng.lat,
              lon: ev.detail.latLng.lng,
              appid: '015e4eaea9c137865941644a12e60199'
            }))
          }}
        />
      </APIProvider>
        : null}

      <div className='col'>
        {weatherData?.weather !== null ? <p>Country : {weatherData?.sys.country}</p> : null}
        {weatherData?.weather !== null ? <p>City : {weatherData?.name}</p> : null}
        {weatherData?.weather !== null ? <p>Climate : {weatherData?.weather?.[0]?.main}</p> : null}
        {weatherData?.weather !== null ? <p>Description : {weatherData?.weather?.[0]?.description}</p> : null}
        {weatherData?.weather !== null ? <p>Temperature : {(weatherData?.main?.temp - 273).toFixed(2)}</p> : null}
      </div>
    </div>
  )
}

export default MapComponent
