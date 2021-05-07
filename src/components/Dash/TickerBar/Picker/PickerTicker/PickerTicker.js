import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol, type, setType, exchange, setExchange }) => {
  let isClicked = false
  
  if (type === symbol) {
    isClicked = true
  } else if (exchange === symbol) {
    isClicked = true
  }
  
  return (
    <div 
      className={`picker-ticker ${isClicked && `exchange-selected`}`} 
      onClick={() => {
        setType && setType(symbol)
        setExchange && setExchange(symbol)
      }}
    >
      <p className="symbol">{symbol}</p>
      <ChevronRight/>
      <ChevronRight className={`chevron-2 ${isClicked && `move-chevron-2`}`}/>
      <ChevronRight className={`chevron-3 ${isClicked && `move-chevron-3`}`}/>
    </div>
  )
} 

export default PickerTicker