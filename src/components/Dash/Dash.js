import React from 'react'
import './_Dash.scss'
import Picker from './Picker'
import InfoBar from './InfoBar'

const Dash = ({ user, exchange, setExchange }) => 
  <div className="dash">
    <Picker user={user} exchange={exchange}/>
    <InfoBar exchange={exchange} setExchange={setExchange}/>
  </div>

export default Dash