import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol, exchange, setExchange }) => 
  <div 
    className={`picker-ticker ${exchange === symbol && `exchange-selected`}`} 
    onClick={() => setExchange && setExchange(symbol)}
  >
    <p className="symbol">{symbol}</p>
    <ChevronRight/>
  </div>

export default PickerTicker