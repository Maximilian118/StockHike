import React from 'react'
import './_Background.scss'
import Dash from '../Dash'
import Candles from '../Candles'
import Footer from '../Footer'
import SunMoon from '../SunMoon'
import Exchange from '../Exchange'

const Background = ({ user, exchange, setExchange }) => 
  <div className="background">
    <SunMoon user={user}/>
    <Dash user={user} exchange={exchange}/>
    <Candles user={user}/>
    {exchange.display && <Exchange exchange={exchange} setExchange={setExchange}/>}
    <Footer user={user}/>
  </div>

export default Background