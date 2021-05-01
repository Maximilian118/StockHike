import React from 'react'
import './_Dash.scss'
import PickerBar from "./PickerBar"
import InfoBar from './InfoBar'

const Dash = ({ user, setUser }) => 
  <div className="dash">
    <PickerBar user={user} setUser={setUser}/>
    <InfoBar/>
  </div>

export default Dash