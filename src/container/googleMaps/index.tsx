// import React from 'react'
// import { GoogleMap, useLoadScript, Marker, type Libraries } from '@react-google-maps/api'

// const mapContainerStyle = {
//   width: '100vw',
//   height: '100vh'
// }
// const center = {
//   lat: 7.2905715, // default latitude
//   lng: 80.6337262 // default longitude
// }

// const libraries: Libraries = ['places']

// const GoogleMaps: React.FC = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBl5683fSMpBmdcWm00lmdDrtLI6K0uLeQ',
//     libraries
//   })

//   if (loadError !== null) {
//     return <div>Error loading maps</div>
//   }

//   if (!isLoaded) {
//     return <div>Loading maps</div>
//   }
//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={center}
//       >
//         <Marker position={center} />
//       </GoogleMap>
//     </div>
//   )
// }

// export default GoogleMaps

import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px'
}

const center = {
  lat: 22.136, // default latitude
  lng: 80.044 // default longitude
}

const GoogleMaps: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBl5683fSMpBmdcWm00lmdDrtLI6K0uLeQ',
    region: 'en'
  })

  const [, setMap] = useState<any | null>(null)

  const onLoad = useCallback(function callback (map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback (_map: any) {
    setMap(null)
  }, [])

  return isLoaded
    ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      )
    : null
}

export default React.memo(GoogleMaps)
