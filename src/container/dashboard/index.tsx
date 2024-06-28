import React, { useEffect, useState } from 'react'
import { Button, Dropdown, FormControl } from 'react-bootstrap'
import 'assets/stylesheets/dashboard.scss'
import { CityList } from 'utils/helpers/cityList'
import { useDispatch } from 'react-redux'
import { weatherBasedOnCityRequest } from 'reducer'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState<Array<{
    State: string
    City: string
    Lat: number
    Long: number
  }>>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<{
    State: string
    City: string
    Lat: number
    Long: number
  }>()

  const [city, setCity] = useState<Array<{
    State: string
    City: string
    Lat: number
    Long: number
  }>>([])

  const [filteredCity, setFilteredCity] = useState<Array<{
    State: string
    City: string
    Lat: number
    Long: number
  }>>([])

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
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {state.map((it, index) => (
            <Dropdown.Item key={`state-${index}`} onClick={() => { setSelectedState(it.State) }}>{it.State}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
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
      <Button
        onClick={() => {
          dispatch(weatherBasedOnCityRequest({
            lat: selectedCity?.Lat.toFixed(2),
            lon: selectedCity?.Long.toFixed(2),
            appid: '015e4eaea9c137865941644a12e60199'
          }))
        }}
      >
        Submit
      </Button>
    </div>
  )
}

export default Dashboard
