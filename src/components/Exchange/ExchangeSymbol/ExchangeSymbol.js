import React from 'react'
import './_ExchangeSymbol.scss'

const ExchangeSymbol = ({ symbol }) => 
  <div className="exchange-symbol">
    <p>{symbol}</p>
  </div>

export default ExchangeSymbol