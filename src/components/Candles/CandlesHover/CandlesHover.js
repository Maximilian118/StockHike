import React from 'react'
import './_CandlesHover.scss'

const CandlesHover = ({ symbol }) => 
  <div className="candles-hover">
    <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
    <p className="symbol">{symbol.symbol}</p>
    <p className="last-price">{symbol.data.y}</p>
  </div>

export default CandlesHover