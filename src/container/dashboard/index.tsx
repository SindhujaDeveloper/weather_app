import React, { useEffect, useState } from 'react'
import { Button, Dropdown, FormControl } from 'react-bootstrap'
import 'assets/stylesheets/dashboard.scss'
import { CityList } from 'utils/helpers/cityList'
import { useDispatch, useSelector } from 'react-redux'
import { weatherBasedOnCityRequest } from 'reducer'
// import GoogleMaps from 'container/googleMaps'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

export interface ICityListState {
  State: string
  City: string
  Lat: number
  Long: number
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()

  const { weatherData } = useSelector((state: any) => state.weather)

  const [searchQuery, setSearchQuery] = useState('')
  const [state, setState] = useState<ICityListState[]>([])
  const [selectedState, setSelectedState] = useState<string>('')
  const [city, setCity] = useState<ICityListState[]>([])
  const [filteredCity, setFilteredCity] = useState<ICityListState[]>([])
  const [selectedCity, setSelectedCity] = useState<ICityListState | null>(null)

  useEffect(() => {
    const tempState: string[] = []
    const stateList = CityList.filter(item => {
      if (tempState.includes(item.State)) {
        return false
      } else {
        tempState.push(item.State)
        return true
      }
    })
    setState(stateList)
  }, [])

  useEffect(() => {
    const cityListBasedOnState = CityList.filter((it) => it.State === selectedState)
    setCity(cityListBasedOnState)
    setFilteredCity(cityListBasedOnState)
  }, [selectedState])

  useEffect(() => {
    const cityWithSearch = searchQuery === '' ? city : city.filter((it) => it.City.includes(searchQuery))
    setFilteredCity(cityWithSearch)
  }, [searchQuery])

  return (
    <div className='dashboard-container'>
      <APIProvider apiKey={'AIzaSyBl5683fSMpBmdcWm00lmdDrtLI6K0uLeQ'} onLoad={() => { console.log('Maps API has loaded.') }}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onClick={(ev: any) => { console.log('detail:', ev.detail) }}
        // onCameraChanged={(ev: MapCameraChangedEvent) => { console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom) }}
        />
      </APIProvider>
      {/* <GoogleMaps /> */}
      <div className='col'>
        <h5>State</h5>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedState !== '' ? selectedState : 'Choose'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {state.map((it, index) => (
              <Dropdown.Item key={`state-${index}`} onClick={() => { setSelectedState(it.State) }}>{it.State}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='col'>
        <h5>City</h5>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCity !== null ? selectedCity?.City : 'Choose'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Search"
              onChange={(e) => { setSearchQuery(e.target.value) }}
              value={searchQuery}
            />
            {filteredCity.map((it, index) => (
              <Dropdown.Item key={`state-${index}`} onClick={() => { setSelectedCity(it) }}>{it.City}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='col'>
        <Button
          onClick={() => {
            dispatch(weatherBasedOnCityRequest({
              // q: selectedCity?.City,
              // units: 'metric',
              lat: selectedCity?.Lat.toFixed(2),
              lon: selectedCity?.Long.toFixed(2),
              appid: '015e4eaea9c137865941644a12e60199'
            }))
          }}
        >
          Submit
        </Button>
      </div>
      <div className='col'>
        {selectedState !== '' ? <p>State : {selectedState}</p> : null}
        {weatherData?.weather !== null && selectedCity?.City !== undefined ? <p>City : {weatherData?.name}</p> : null}
        {weatherData?.weather !== null ? <p>Climate : {weatherData?.weather?.[0]?.main}</p> : null}
        {weatherData?.weather !== null ? <p>Description : {weatherData?.weather?.[0]?.description}</p> : null}
        {weatherData?.weather !== null ? <p>Temperature : {(weatherData?.main?.temp - 273).toFixed(2)}</p> : null}
      </div>
    </div>
  )
}

export default Dashboard
