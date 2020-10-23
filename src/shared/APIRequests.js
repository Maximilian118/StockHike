import axios from 'axios'

export const getCandles = async (symbol, resolution, from, to, user, setUser) => {
  const defaults = ['AAPL', 'TSLA', 'GOOGL', 'FB']
  if (symbol === 'Default') {
    Promise.all(
      defaults.map(async def => {
        await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${def}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {  
          def = {
            [def]: res.data.c,
          }

          process.env.NODE_ENV === 'development' && console.log(res)
        }).catch(err => {
          process.env.NODE_ENV === 'development' && console.log(err)
        })

        return def
      })
    ).then(res => {
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
    })
  } else {
    axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
      const newSymbols = {
        ...user.symbols,
        [symbol]: res.data.c,
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