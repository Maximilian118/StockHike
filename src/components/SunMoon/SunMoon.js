import React from 'react'
import './_SunMoon.scss'
import { Circle, Moon } from 'react-feather'

const SunMoon = ({ user }) => 
  <div className="sun-moon-container">
    { user.location.is_day ? 
      <Circle className="sun-moon" style={{ bottom: `${user.location.percent}%`}}/> : 
      <Moon className="sun-moon" style={{ bottom: `${user.location.percent}%`}}/>
    }
  </div>

export default SunMoon