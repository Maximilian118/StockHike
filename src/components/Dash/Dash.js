import React from 'react'
import './_Dash.scss'
import Picker from './Picker'
import InfoBar from './InfoBar'

const Dash = ({ user }) => 
  <div className="dash">
    <Picker user={user}/>
    <InfoBar/>
  </div>

export default Dash