import React from 'react'
import './_Picker.scss'
import PickerItem from './PickerItem'

const Picker = ({ user }) =>
  <div className="picker">
    {user.symbols.map(symbol => <PickerItem key={symbol.symbol} symbol={symbol}/>)}
  </div>

export default Picker