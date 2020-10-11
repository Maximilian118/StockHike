import axios from 'axios'

export const getCandles = (symbol, res, from, to) => {
  axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${res}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_APIKEY}`).then(res => {
    process.env.NODE_ENV === 'development' && console.log(res)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
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