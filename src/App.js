import React, { useState, useEffect } from 'react'
import './scss/base.scss'
import Background from './components/Background'
import { checkLocalStorage } from './shared/localStorage'
import { getDefaultCandles, getLocationInfo } from './shared/APIRequests'
import moment from 'moment'

const Context = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ exchange, setExchange ] = useState(localStorage.getItem("exchange") ? JSON.parse(localStorage.getItem("exchange")) : null)
  const [ user, setUser ] = useState(checkLocalStorage())

  useEffect(() => {
    if (user.symbols.length > 0) {
      getLocationInfo(user, setUser)
    } else {
      getDefaultCandles('D', moment().subtract(1, 'year').unix(), moment().unix(), user, setUser)
    }
  }, [user])

  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({ loading, exchange, user })

  return (
    <Context.Provider value={{ loading, setLoading, exchange, setExchange, user, setUser }}>
      <Background user={user}/>
    </Context.Provider>
  )
}

export default App
export { Context }