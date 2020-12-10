import React from 'react'
import './_SunMoon.scss'
import { Circle, Moon } from 'react-feather'

const SunMoon = ({ user }) => 
  <div className="sun-moon-container">
    { user.location.isDay ? 
      <Circle className="sun-moon" style={{ bottom: `${user.location.xy.y}%`, left: `${user.location.xy.x}%`}}/> : 
      <Moon className="sun-moon" style={{ bottom: `${user.location.xy.y}%`, left: `${user.location.xy.x}%`}}/>
    }
  </div>

export default SunMoon