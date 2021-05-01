import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol }) => 
  <div className="picker-ticker">
    <p className="symbol">{symbol}</p>
    <ChevronRight/>
  </div>

export default PickerTicker