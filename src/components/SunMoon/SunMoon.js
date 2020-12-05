import React from 'react'
import './_SunMoon.scss'
import { Circle, Moon } from 'react-feather'

const SunMoon = ({ user }) => 
  <div className="sun-moon-container">
    {!user.isDay ? <Circle className="sun-moon"/> : <Moon className="sun-moon"/>}
  </div>

export default SunMoon