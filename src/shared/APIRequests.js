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
      const hourAgo = moment().subtract(1, "hour")
      const lat = Number(position.coords.latitude.toFixed(3))
      const lon = Number(position.coords.longitude.toFixed(3))

      if (!user.location || hourAgo.isAfter(user.location.current) || user.location.lat !== lat || user.location.lon !== lon) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5f7c8248bb9c14a8c3f7709ca1247c31&units=metric`).then(res => {

          const date = moment().format("YYYY-MM-DD")
          const time = moment().format("HH:mm:ss")
          const dateTime = moment(`${date} ${time}`)

          const sunrise = moment(`${date} ${moment.unix(res.data.sys.sunrise).format("HH:mm:ss")}`)
          const sunset = moment(`${date} ${moment.unix(res.data.sys.sunset).format("HH:mm:ss")}`)

          const hour24 = moment(`${date} 24:00:00`)
          const hour0 = moment(`${date} 00:00:00`)

          const sunsetTillHour24 = hour24.clone().subtract(sunset)
          const hour24TillSunrise = sunrise.clone().subtract(hour0)

          const midnight = sunset.clone().add(sunsetTillHour24.clone().add(hour24TillSunrise).valueOf()/2)
          const midday = sunrise.clone().add(sunset.clone().subtract(sunrise).valueOf()/2)

          const findYaxis = (dateTime, sunrise, midday, sunset, midnight) => {
            const dayPercentPerMs = 100/midday.clone().subtract(sunrise).valueOf()
            const nightPercentPerMs = 100/midnight.clone().subtract(sunset).valueOf()

            let y = 0

            if (dateTime.isSame(sunrise) || dateTime.isSame(sunset)) {
              return 0
            } else if (dateTime.isSame(midday) || dateTime.isSame(midnight)) {
              return 100
            }

            if (dateTime.isBetween(sunrise, midday)) {
              y = dateTime.subtract(sunrise).valueOf() * dayPercentPerMs
            } else if(dateTime.isBetween(midday, sunset)) {
              y = 100 - (dateTime.subtract(midday).valueOf() * dayPercentPerMs)
            } else if(dateTime.isBetween(sunset, midnight)) {
              y = dateTime.subtract(sunset).valueOf() * nightPercentPerMs
            } else {
              y = 100 - (dateTime.subtract(midnight).valueOf() * nightPercentPerMs)
            }

            return y
          }

          const location = {
            isDay: dateTime.isAfter(sunrise) && dateTime.isBefore(sunset) ? true : false,
            temp: res.data.main,
            weather: res.data.weather[0],
            wind: res.data.wind,
            country: res.data.sys.country,
            current: dateTime.format(),
            sunrise: sunrise.format(),
            sunset: sunset.format(),
            midday: midday.format(),
            midnight: midnight.format(),
            y: findYaxis(dateTime, sunrise, midday, sunset, midnight),
            lat: lat,
            lon: lon,
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