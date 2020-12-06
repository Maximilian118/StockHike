import axios from 'axios'
import { candleData, setColours } from './utility'
import moment from 'moment'

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
    const sortedArray = defsArr.map(symbol => symbol).sort((a, b) => (a.candles.max > b.candles.max) ? 1 : -1)
    const sortedArrayWithColours = sortedArray.map((symbol, i) => {
      return {
        ...symbol,
        colour: setColours()[i],
      }
    })

    setUser({
      ...user,
      symbols: sortedArrayWithColours,
    })

    localStorage.setItem("defaults", true)
    localStorage.setItem("symbols", JSON.stringify(sortedArrayWithColours))
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

export const getLocationInfo = (user, setUser) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      if (!user.location || user.location.lat !== position.coords.latitude || user.location.lon !== position.coords.longitude) {
        axios.get(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}`).then(res => {
          for (const property in res.data.results) {
            res.data.results = {
              ...res.data.results,
              [property]: moment(res.data.results[property], 'h:mm:ss: A').diff(moment().startOf('day'), 'seconds'),
            }
          }

          const current_time = moment(moment().format('HH:mm:ss: A'), 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds')

          const location = {
            ...res.data.results,
            current_time: current_time,
            mid_day: (res.data.results.sunrise + res.data.results.sunset) / 2,
            mid_night: ((res.data.results.sunrise + res.data.results.sunset) / 2) + (12 * 60 * 60),
            is_day: current_time > res.data.results.sunrise && current_time < res.data.results.sunset ? true : false,
            lat: Number(position.coords.latitude),
            lon: Number(position.coords.longitude),
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