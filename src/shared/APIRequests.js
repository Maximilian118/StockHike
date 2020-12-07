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
              [property]: moment(res.data.results[property], ["h:mm:ss A"]).format("HH:mm:ss"),
            }
          }

          const current_date = moment().format("YYYY-MM-DD")
          const current_time = moment().format("HH:mm:ss")
          const current_date_time = moment(`${current_date} ${current_time}`)

          const sunrise = moment(`${current_date} ${res.data.results.sunrise}`)
          const sunset = moment(`${current_date} ${res.data.results.sunset}`)
          const hour24 = moment(`${current_date} 24:00:00`)
          const hour0 = moment(`${current_date} 00:00:00`)

          const sunset_till_hour24 = hour24.clone().subtract(sunset)
          const hour24_till_sunrise = sunrise.clone().subtract(hour0)

          const midnight = sunset.clone().add(sunset_till_hour24.clone().add(hour24_till_sunrise).valueOf()/2)
          const midday = sunrise.clone().add(sunset.clone().subtract(sunrise).valueOf()/2)

          const day_percent_per_ms = 100/midday.clone().subtract(sunrise).valueOf()
          const night_percent_per_ms = 100/midnight.clone().subtract(sunset).valueOf()

          let percent = 0
        
          if (current_date_time.isSame(sunrise) || current_date_time.isSame(sunset)) {
            percent = 0
          } else if (current_date_time.isSame(midday) || current_date_time.isSame(midnight)) {
            percent = 100
          }
          
          if (current_date_time.isBetween(sunrise, midday)) {
            percent = current_date_time.subtract(sunrise).valueOf() * day_percent_per_ms
          } else if(current_date_time.isBetween(midday, sunset)) {
            percent = 100 - (current_date_time.subtract(midday).valueOf() * day_percent_per_ms)
          } else if(current_date_time.isBetween(sunset, midnight)) {
            percent = current_date_time.subtract(sunset).valueOf() * night_percent_per_ms
          } else {
            percent = 100 - (current_date_time.subtract(midnight).valueOf() * night_percent_per_ms)
          }

          const location = {
            ...res.data.results,
            current_date: current_date,
            current_time: current_time,
            midday: midday.format("HH:mm:ss"),
            midnight: midnight.format("HH:mm:ss"),
            percent: Number(percent.toFixed(2)),
            is_day: moment().isAfter(sunrise) && moment().isBefore(sunset) ? true : false,
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