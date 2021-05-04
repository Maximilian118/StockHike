import React, { useState } from 'react'
import './_Picker.scss'
import PickerTicker from './PickerTicker'
import { finnHubExchanges } from '../../../../shared/utility'

const Picker = () => {
  const [ exchange, setExchange ] = useState("")

  let exchangeArr = null
  Object.entries(finnHubExchanges).forEach(type => {
    if (exchange === type[0]) {
      exchangeArr = type[1]
    }
  })

  return (
    <div className="picker">
      <div className="picker-col">
        {Object.keys(finnHubExchanges).map((symbol, i) => 
          <PickerTicker 
          key={i} 
          symbol={symbol}
          exchange={exchange}
          setExchange={setExchange}
        />)}
      </div>
      <div className="picker-col">
        {exchangeArr && exchangeArr.map((symbol, i) => 
          <PickerTicker
          key={i}
          symbol={symbol}
        />)}
      </div>
      <div className="picker-col">

      </div>
    </div>
  )
}

export default Picker