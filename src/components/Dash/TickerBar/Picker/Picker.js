import React, { useEffect, useState } from 'react'
import './_Picker.scss'
import PickerTicker from './PickerTicker'
import PickerCol from './PickerCol'
import { finnHubExchanges } from '../../../../shared/utility'

const Picker = () => {
  const [ type, setType ] = useState("")
  const [ exchange, setExchange ] = useState("")
  const [ symbols, setSymbols ] = useState([])
  
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
      setSymbols([])
    }
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="picker">
      <PickerCol>
        {Object.keys(finnHubExchanges).map((symbol, i) => 
          <PickerTicker 
          key={i} 
          symbol={symbol}
          type={type}
          setType={setType}
        />)}
      </PickerCol>
      <PickerCol>
        {exchangeArr.map((symbol, i) => 
          <PickerTicker
          key={i}
          symbol={symbol}
          exchange={exchange}
          setExchange={setExchange}
          setSymbols={setSymbols}
        />)}
      </PickerCol>
      <PickerCol>
        {symbols.map((symbol, i) => 
          <PickerTicker
          key={i}
          symbol={symbol}
        />)}
      </PickerCol>
    </div>
  )
}

export default Picker