import React from 'react'
import './_PickerItem.scss'

const PickerItem = ({ symbol }) => 
  <div className="pickeritem">
    <p><strong>{symbol.symbol}</strong> {symbol.candles.max.toFixed(2)}</p>
  </div>

export default PickerItem