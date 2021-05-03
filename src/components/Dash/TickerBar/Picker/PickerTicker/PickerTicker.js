import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol, setExchange }) => 
  <div className="picker-ticker" onClick={() => setExchange && setExchange(symbol)}>
    <p className="symbol">{symbol}</p>
    <ChevronRight/>
  </div>

export default PickerTicker