import axios from 'axios'
import { toPercent } from './utility'

export const getDefaultCandles = (resolution, from, to, user, setUser) => {
  const defaults = ['AAPL', 'TSLA', 'GOOGL']
  
  Promise.all(
    defaults.map(async def => {
      await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${def}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {  
        def = {
          [def]: {
            price: res.data.c,
            percent: toPercent(res.data.c),
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
  })
}

export const getCandles = (symbol, resolution, from, to, user, setUser) => {
  axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
    const newSymbols = {
      ...user.symbols,
      defaults: false,
      [symbol]: {
        price: res.data.c,
        percent: toPercent(res.data.c),
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
      if (!symbol[1].hasOwnProperty('info') && symbol[0] !== 'defaults') {
        madeRequest = true
        await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol[0]}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
          symbol = {
            [symbol[0]]: {
              ...symbol[1],
              info: res.data,
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
  })
}

export const getSuriseSunset = (geo, user, setUser) => {
  axios.get(`https://api.sunrise-sunset.org/json?lat=${geo.lat}&lng=${geo.lon}`).then(res => {
    setUser({
      ...user,
      ss: res.data.results,
    })

    localStorage.setItem("ss", JSON.stringify(res.data.results))

    process.env.NODE_ENV === 'development' && console.log(res)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}