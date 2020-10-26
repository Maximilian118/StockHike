// return the latitude and longitude of the users current location.
export const checkGeo = (user, setUser) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      if (!user.geo || user.geo.lat !== position.coords.latitude || user.geo.lon !== position.coords.longitude) {
        localStorage.removeItem('ss')

        const geo = {
          lat: Number(position.coords.latitude),
          lon: Number(position.coords.longitude),
        }

        setUser({
          ...removeKey(user, "ss"),
          geo: geo,
        })

        localStorage.setItem('geo', JSON.stringify(geo))
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}

// Convert priceArr to data for line chart.
export const toXY = (symbol, priceArr) => {
  return {
    id: symbol,
    max: Math.max(...priceArr),
    min: Math.min(...priceArr),
    data: priceArr.map((price, i) => {
      return {
        "x": i,
        "y": price,
      }
    }),
  }
}

// Sort the symbols into an array of objects for Candles component.
// Object with the highest max value to the object to the lowest max value.
export const sortSymbols = user => {
  const symbolXYData = []

  for (const symbols in user.symbols) {
    symbolXYData.push(user.symbols[symbols].xy)
  }

  symbolXYData.sort((a, b) => (a.max > b.max) ? 1 : -1)

  return symbolXYData
}

// Remove a key: value pair from context. 
// Function call example: removeKey(user, "nameOfKey")
export const removeKey = (obj, prop) => {
  let {[prop]: omit, ...res} = obj
  return res
}