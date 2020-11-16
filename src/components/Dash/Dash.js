import React from 'react'
import './_Dash.scss'
import Picker from './Picker'
import InfoBar from './InfoBar'

const Dash = () => 
  <div className="dash">
    <Picker/>
    <InfoBar/>
  </div>

export default Dash