import React, { useState, useEffect } from 'react'
import './scss/base.scss'
import Background from './components/Background'
import { checkGeo } from './shared/utility'
import { checkLocalStorage } from './shared/localStorage'
import { getSuriseSunset } from './shared/APIRequests'

const Context = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())

  useEffect(() => {
    checkGeo(user, setUser)
    user.geo && !user.ss && getSuriseSunset(user.geo, user, setUser)
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