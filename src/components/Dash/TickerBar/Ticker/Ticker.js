import React from 'react'
import './_Ticker.scss'
import { ChevronUp, ChevronDown, X } from 'react-feather'
import { removeSymbol } from '../../../../shared/utility'

const Ticker = ({ symbol, i, total, user, setUser }) =>
  <div className="ticker">
    <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
    <p className="symbol">{symbol.symbol}</p>
    <p className="last-price">{Number(symbol.candles.data.slice(-1)[0].y).toFixed(2)}</p>
    <div className="btns">
      {i !== total - 1 && <ChevronDown style={{ marginRight: i === 0 ? 18 : 0 }}/>}
      {i !== 0 && <ChevronUp/>}
      <X className="remove" onClick={() => removeSymbol(user, setUser, symbol)}/>
    </div>
  </div>

export default Ticker