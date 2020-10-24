import React from 'react'
import './_Background.scss'
import Dash from '../Dash'
import Candles from '../Candles'
import Footer from '../Footer'

const Background = () => 
  <div className="background">
    <Dash/>
    <Candles/>
    <Footer/>
  </div>

export default Background