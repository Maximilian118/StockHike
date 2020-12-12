import React from 'react'
import './_PickerItem.scss'
import { ChevronUp, ChevronDown } from 'react-feather'

const PickerItem = ({ symbol, i, total }) => 
  <div className={`pickeritem ${symbol.y && `bg`}`}>
    <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
    <p className="symbol">{symbol.symbol}</p>
    <p className="last-price">{symbol.candles ? Number(symbol.candles.data.slice(-1)[0].y).toFixed(2) : symbol.data.y}</p>
    {!symbol.y && <div className="btns">
      {i !== total - 1 && <ChevronDown style={{ marginRight: i === 0 ? 18 : 0 }}/>}
      {i !== 0 && <ChevronUp/>}
    </div>}
  </div>

export default PickerItem