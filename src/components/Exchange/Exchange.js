import React, { useEffect } from 'react'
import './_Exchange.scss'
import ExchangeSymbol from './ExchangeSymbol'
import { finnHubExchanges } from '../../shared/utility'

const Exchange = ({ exchange, setExchange }) => {
  useEffect(() => {
    if (exchange.exchange && exchange.data.length === 0) {
      setExchange({ display: true })
    }
  }, [exchange, setExchange])

  return (
    <div className="exchange">
      {exchange.data ? 
        exchange.data.map((symbol, i) => <ExchangeSymbol key={i} symbol={symbol}/>)
        :
        finnHubExchanges.stock.map((ex, i) => 
          <ExchangeSymbol 
            key={i} 
            symbol={ex} 
            exchange={exchange} 
            setExchange={setExchange}
          />
        )
      }
    </div>
  )
}

export default Exchange