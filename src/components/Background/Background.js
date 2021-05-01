import React from 'react'
import './_Background.scss'
import Dash from '../Dash'
import Candles from '../Candles'
import Footer from '../Footer'
import SunMoon from '../SunMoon'

const Background = ({ user, setUser }) => 
  <div className="background">
    <SunMoon user={user}/>
    <Dash user={user} setUser={setUser}/>
    <Candles user={user}/>
    <Footer user={user}/>
  </div>

export default Background