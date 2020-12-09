import React from 'react'
import './_SunMoon.scss'
import { Circle, Moon } from 'react-feather'

const SunMoon = ({ user }) => 
  <div className="sun-moon-container">
    { user.location.isDay ? 
      <Circle className="sun-moon" style={{ bottom: `${user.location.y}%`}}/> : 
      <Moon className="sun-moon" style={{ bottom: `${user.location.y}%`}}/>
    }
  </div>

export default SunMoon