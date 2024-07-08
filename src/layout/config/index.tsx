interface IEnvironmentStore {
  [key: string]: string | string[] | number[] | undefined
  REACT_APP_GOOGLE_MAPS_API_KEY: string
}

interface IENVConfig {
  googleMapsApiKey: string
}

export let compileTimeEnv: IEnvironmentStore
try {
  compileTimeEnv = process.env as IEnvironmentStore
} catch (error) {
  console.log(error, 'error')
  compileTimeEnv = {
    REACT_APP_GOOGLE_MAPS_API_KEY: ''
  }
}

console.log(compileTimeEnv)
export const config: IENVConfig = {
  googleMapsApiKey: compileTimeEnv.REACT_APP_GOOGLE_MAPS_API_KEY
}
