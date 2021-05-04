import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol, exchange, setExchange }) => 
  <div 
    className={`picker-ticker ${exchange === symbol && `exchange-selected`}`} 
    onClick={() => setExchange && setExchange(symbol)}
  >
    {/* <div className="symbol-colour-circle"/> */}
    <p className="symbol">{symbol}</p>
    <ChevronRight/>
    <ChevronRight className={`chevron-2 ${exchange === symbol && `move-chevron-2`}`}/>
    <ChevronRight className={`chevron-3 ${exchange === symbol && `move-chevron-3`}`}/>
  </div>

export default PickerTicker