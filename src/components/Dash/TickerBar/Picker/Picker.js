import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../../App'
import './_Picker.scss'
import PickerTicker from './PickerTicker'
import { finnHubExchanges } from '../../../../shared/utility'
import { List } from 'react-virtualized'

const Picker = () => {
  const { user, setUser } = useContext(Context)
  const [ type, setType ] = useState("")
  const [ exchange, setExchange ] = useState("")
  const [ symbols, setSymbols ] = useState([])

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
      <div className="picker-col">
        {Object.keys(finnHubExchanges).map((symbol, i) => 
          <PickerTicker 
          key={i} 
          symbol={symbol}
          type={type}
          setType={setType}
        />)}
      </div>
      <List
        width={140}
        height={75}
        rowHeight={25}
        rowCount={exchangeArr.length}
        rowRenderer={({key, index, style, parent}) => 
          <PickerTicker
            key={key}
            style={style}
            symbol={exchangeArr[index]}
            exchange={exchange}
            setExchange={setExchange}
            setSymbols={setSymbols}
          />
        }
      />
      <List
        width={140}
        height={75}
        rowHeight={25}
        rowCount={symbols.length}
        rowRenderer={({key, index, style, parent}) => 
          <PickerTicker
            key={key}
            style={style}
            symbol={symbols[index]}
            user={user}
            setUser={setUser}
          />
        }
      />
    </div>
  )
}

export default Picker