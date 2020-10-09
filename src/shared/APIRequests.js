import axios from 'axios'

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