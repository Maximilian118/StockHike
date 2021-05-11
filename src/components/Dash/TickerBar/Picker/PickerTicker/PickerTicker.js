import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight, Plus } from 'react-feather'
import { getCandles, getExchangeInfo } from '../../../../../shared/APIRequests'
import moment from 'moment'

const PickerTicker = ({ symbol, type, setType, exchange, setExchange, setSymbols, user, setUser, style }) => {
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

  const onClickStage = () => {
    setType && setType(symbol)
    setExchange && exchangeSelected()
    setUser && getCandles(symbol, 'D', moment().subtract(1, 'year').unix(), moment().unix(), user, setUser)
  }
  
  const whichSVG = () => {
    if (setUser) {
      return <Plus/>
    } else {
      return (
        <>
          <ChevronRight/>
          <ChevronRight className={`chevron-2 ${isClicked && `move-chevron-2`}`}/>
          <ChevronRight className={`chevron-3 ${isClicked && `move-chevron-3`}`}/>
        </>
      )
    }
  }

  return (
    <div className={`picker-ticker ${isClicked && `selected`}`} onClick={() => onClickStage()} style={style}>
      <p className="symbol">{symbol}</p>
      {whichSVG()}
    </div>
  )
} 

export default PickerTicker