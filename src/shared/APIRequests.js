import axios from 'axios'
import { candleData, setColours } from './utility'

export const getDefaultCandles = (resolution, from, to, user, setUser) => {
  const defaults = ['AAPL', 'TSLA', 'FB']
  
  Promise.all(
    defaults.map(async def => {
      await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${def}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {  
        def = {
          symbol: def,
          candles: candleData(def, res.data.c),
        }

        process.env.NODE_ENV === 'development' && console.log(res)
      }).catch(err => {
        process.env.NODE_ENV === 'development' && console.log(err)
      })

      return def
    })
  ).then(defsArr => {
    setUser({
      ...user,
      symbols: defsArr,
    })

    localStorage.setItem("defaults", true)
    localStorage.setItem("symbols", JSON.stringify(defsArr))
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

export const getLocationInfo = (user, setUser) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      if (!user.location || user.location.lat !== position.coords.latitude || user.location.lon !== position.coords.longitude) {
        axios.get(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}`).then(res => {
          const location = {
            ...res.data.results,
            lat: Number(position.coords.latitude),
            lon: Number(position.coords.longitude),
            colours: setColours(res.data.results),
          }

          setUser({
            ...user,
            location: location,
          })

          localStorage.setItem('location', JSON.stringify(location))
          process.env.NODE_ENV === 'development' && console.log(res)
        }).catch(err => {
          process.env.NODE_ENV === 'development' && console.log(err)
        })
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}