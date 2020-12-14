import React from 'react'
import './_Dash.scss'
import Picker from './Picker'
import InfoBar from './InfoBar'

const Dash = ({ user, exchange }) => 
  <div className="dash">
    <Picker user={user} exchange={exchange}/>
    <InfoBar exchange={exchange}/>
  </div>

export default Dash