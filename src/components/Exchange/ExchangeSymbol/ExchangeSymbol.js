import React from 'react'
import './_ExchangeSymbol.scss'
import { getExchangeInfo } from '../../../shared/APIRequests'

const ExchangeSymbol = ({ symbol, exchange, setExchange }) => 
  <div className="exchange-symbol" onClick={() => exchange && getExchangeInfo(symbol, exchange, setExchange)}>
    <p>{symbol}</p>
  </div>

export default ExchangeSymbol