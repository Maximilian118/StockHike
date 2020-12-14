import React, { useEffect } from 'react'
import { getExchange } from '../../shared/APIRequests'
import './_Exchange.scss'
import ExchangeSymbol from './ExchangeSymbol'

const Exchange = ({ exchange, setExchange }) => {
  useEffect(() => {
    !exchange.data && getExchange("MI", exchange, setExchange)
  }, [exchange, setExchange])

  return (
    <div className="exchange">
      {exchange.data && exchange.data.map((symbol, i) => <ExchangeSymbol key={i} symbol={symbol}/>)}
    </div>
  )
}

export default Exchange