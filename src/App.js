import React, { useState, useEffect } from 'react'
import './scss/base.scss'
import Background from './components/Background'
import { checkUserLS, checkExchangeLS } from './shared/localStorage'
import { getDefaultCandles, getLocationInfo } from './shared/APIRequests'
import moment from 'moment'

const Context = React.createContext()

const App = () => {
  const [ user, setUser ] = useState(checkUserLS())
  const [ loading, setLoading ] = useState(false)
  const [ exchange, setExchange ] = useState(checkExchangeLS())

  useEffect(() => {
    if (user.symbols.length > 0) {
      getLocationInfo(user, setUser)
    } else {
      getDefaultCandles('D', moment().subtract(1, 'year').unix(), moment().unix(), user, setUser)
    }
  }, [user])

  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({ user, loading, exchange })

  return (
    <Context.Provider value={{ user, setUser, loading, setLoading, exchange, setExchange }}>
      <Background user={user} exchange={exchange} setExchange={setExchange}/>
    </Context.Provider>
  )
}

export default App
export { Context }