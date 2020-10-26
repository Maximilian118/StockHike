import React from 'react'
import './_Background.scss'
import Dash from '../Dash'
import Candles from '../Candles'
import Footer from '../Footer'

const Background = ({ user }) => 
  <div className="background">
    <Dash/>
    <Candles user={user}/>
    <Footer/>
  </div>

export default Background