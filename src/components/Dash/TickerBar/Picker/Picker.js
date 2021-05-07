import React, { useEffect, useState } from 'react'
import './_Picker.scss'
import PickerTicker from './PickerTicker'
import { finnHubExchanges } from '../../../../shared/utility'

const Picker = () => {
  const [ type, setType ] = useState("")
  const [ exchange, setExchange ] = useState("")
  
  console.log(type, exchange)

  let exchangeArr = []
  Object.entries(finnHubExchanges).forEach(typ => {
    if (type === typ[0]) {
      exchangeArr = typ[1]
    }
  })

  useEffect(() => {
    if (type !== "" && !finnHubExchanges[type].includes(exchange)) {
      setExchange("")
    }
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="picker">
      <div className="picker-col">
        {Object.keys(finnHubExchanges).map((symbol, i) => 
          <PickerTicker 
          key={i} 
          symbol={symbol}
          type={type}
          setType={setType}
        />)}
      </div>
      <div className="picker-col">
        {exchangeArr.map((symbol, i) => 
          <PickerTicker
          key={i}
          symbol={symbol}
          exchange={exchange}
          setExchange={setExchange}
        />)}
      </div>
      <div className="picker-col">

      </div>
    </div>
  )
}

export default Picker