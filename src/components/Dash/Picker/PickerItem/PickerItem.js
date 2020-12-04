import React from 'react'
import './_PickerItem.scss'

const PickerItem = ({ symbol }) => 
  <div className={`pickeritem ${symbol.y && `hover`}`}>
    <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
    <p className="symbol">{symbol.symbol}</p><p>{symbol.candles ? symbol.candles.max.toFixed(2) : symbol.data.y}</p>
  </div>

export default PickerItem