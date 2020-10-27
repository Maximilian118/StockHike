import axios from 'axios'
import { candleData } from './utility'

export const getDefaultCandles = (resolution, from, to, user, setUser) => {
  const defaults = ['AAPL', 'TSLA', 'FB']
  
  Promise.all(
    defaults.map(async def => {
      await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${def}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {  
        def = {
          [def]: {
            candles: candleData(def, res.data.c),
          },
        }

        process.env.NODE_ENV === 'development' && console.log(res)
      }).catch(err => {
        process.env.NODE_ENV === 'development' && console.log(err)
      })

      return def
    })
  ).then(res => {
    let defsToObj = {
      defaults: true,
    }

    res.forEach(obj => defsToObj = {
      ...defsToObj,
      ...obj,
    })
    
    setUser({
      ...user,
      symbols: defsToObj,
    })

    localStorage.setItem("symbols", JSON.stringify(defsToObj))
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

export const getCandles = (symbol, resolution, from, to, user, setUser) => {
  axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
    const newSymbols = {
      ...user.symbols,
      defaults: false,
      [symbol]: {
        candles: candleData(symbol, res.data.c),
      },
    }

    setUser({
      ...user,
      symbols: newSymbols,
    })

    localStorage.setItem("symbols", JSON.stringify(newSymbols))

    process.env.NODE_ENV === 'development' && console.log(res)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

export const getSymbolInfo = (user, setUser) => {
  let madeRequest = false

  Promise.all(
    Object.entries(user.symbols).map(async symbol => {
      if (!symbol[1].hasOwnProperty('name') && symbol[0] !== 'defaults') {
        madeRequest = true
        await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol[0]}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
          symbol = {
            [symbol[0]]: {
              ...symbol[1],
              ...res.data,
            }
          }

          process.env.NODE_ENV === 'development' && console.log(res)
        }).catch(err => {
          process.env.NODE_ENV === 'development' && console.log(err)
        })

        return symbol
      } else {
        return {
          [symbol[0]]: symbol[1],
        }
      }
    })
  ).then(res => {
    if (madeRequest) {
      let toObj = {}

      res.forEach(obj => toObj = {
        ...toObj,
        ...obj,
      })

      setUser({
        ...user,
        symbols: toObj,
      })

      localStorage.setItem("symbols", JSON.stringify(toObj))
    }
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