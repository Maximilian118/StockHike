import React, { useState, useEffect } from 'react'
import './scss/base.scss'
import Background from './components/Background'
import { checkGeo } from './shared/utility'
import { checkLocalStorage } from './shared/localStorage'
import { getDefaultCandles, getSuriseSunset } from './shared/APIRequests'
import moment from 'moment'

const Context = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())

  useEffect(() => {
    Object.keys(user.symbols).length === 0 && getDefaultCandles('D', moment().subtract(1, 'year').unix(), moment().unix(), user, setUser)
    
    if (user.geo) {
      !user.ss && getSuriseSunset(user.geo, user, setUser)
    } else {
      checkGeo(user, setUser)
    }

  }, [user])

  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({ loading, user })

  return (
    <Context.Provider value={{ loading, setLoading, user, setUser }}>
      <Background/>
    </Context.Provider>
  )
}

export default App
export { Context }