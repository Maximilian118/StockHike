import React from 'react'
import './_Dash.scss'
import TickerBar from "./TickerBar"
import InfoBar from './InfoBar'

const Dash = ({ user }) => 
  <div className="dash">
    <TickerBar user={user}/>
    <InfoBar/>
  </div>

export default Dash