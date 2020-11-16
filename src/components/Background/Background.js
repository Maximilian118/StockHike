import React from 'react'
import './_Background.scss'
import Dash from '../Dash'
import Candles from '../Candles'
import Footer from '../Footer'

const Background = ({ user }) => 
  <div className="background">
    <Dash user={user}/>
    <Candles user={user}/>
    <Footer user={user}/>
  </div>

export default Background