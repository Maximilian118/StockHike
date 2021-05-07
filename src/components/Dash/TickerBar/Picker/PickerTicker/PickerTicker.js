import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'
import { getExchangeInfo } from '../../../../../shared/APIRequests'

const PickerTicker = ({ symbol, type, setType, exchange, setExchange, setSymbols, style }) => {
  let isClicked = false

  if (type === symbol) {
    isClicked = true
  } else if (exchange === symbol) {
    isClicked = true
  }

  const exchangeSelected = () => {
    setExchange(symbol)
    getExchangeInfo(symbol, setSymbols)
  }
  
  return (
    <div 
      className={`picker-ticker ${isClicked && `exchange-selected`}`}
      style={style}
      onClick={() => {
        setType && setType(symbol)
        setExchange && exchangeSelected()
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