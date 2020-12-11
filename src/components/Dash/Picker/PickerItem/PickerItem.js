import React from 'react'
import './_PickerItem.scss'

const PickerItem = ({ symbol }) => 
  <div className={`pickeritem ${symbol.y && `bg`}`}>
    <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
    <p className="symbol">{symbol.symbol}</p><p>{symbol.candles ? Number(symbol.candles.data.slice(-1)[0].y).toFixed(2) : symbol.data.y}</p>
  </div>

export default PickerItem