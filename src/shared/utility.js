// return the latitude and longitude of the users current location.
export const checkGeo = (user, setUser) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      if (!user.geolocation || user.geolocation.lat !== position.coords.latitude || user.geolocation.lon !== position.coords.longitude) {
        const geolocation = {
          lat: Number(position.coords.latitude),
          lon: Number(position.coords.longitude),
        }

        setUser({
          ...user,
          geolocation: geolocation,
        })

        localStorage.setItem('geolocation', JSON.stringify(geolocation))
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}