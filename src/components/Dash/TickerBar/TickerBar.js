import React, { useContext } from 'react'
import { Context } from '../../../App'
import './_TickerBar.scss'
import Ticker from './Ticker'
import New from './New'
import Picker from './Picker'

const TickerBar = ({ user }) => {
  const { setUser, picking, setPicking } = useContext(Context)

  return (
    <div className="ticker-bar">
      {user.symbols && user.symbols.map((symbol, i) => 
        <Ticker 
        key={i} 
        symbol={symbol}
        i={i} 
        total={user.symbols.length}
        user={user}
        setUser={setUser}
      />)}
      {picking ? 
        <Picker/>
      : 
        <New 
        picking={picking} 
        setPicking={setPicking}
      />}
    </div>
  )
}

export default TickerBar