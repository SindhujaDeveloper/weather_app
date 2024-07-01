const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export const API = {
  login: { apiPath: 'https://api.openweathermap.org/data/2.5/weather', action: HttpMethods.GET },
  weatherCity: { apiPath: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather', action: HttpMethods.GET }
}
