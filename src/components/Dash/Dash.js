import React from 'react'
import './_Dash.scss'
import PickerBar from "./PickerBar"
import InfoBar from './InfoBar'

const Dash = ({ user }) => 
  <div className="dash">
    <PickerBar user={user}/>
    <InfoBar/>
  </div>

export default Dash