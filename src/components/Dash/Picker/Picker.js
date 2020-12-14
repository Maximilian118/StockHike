import React from 'react'
import './_Picker.scss'
import PickerItem from './PickerItem'
import AddItem from './AddItem'

const Picker = ({ user, exchange }) => 
  <div className="picker">
    {user.symbols && user.symbols.map((symbol, i) => 
      <PickerItem 
      key={i} 
      symbol={symbol} 
      i={i} 
      total={user.symbols.length}
      exchange={exchange}
    />)}
    {!exchange.display && <AddItem/>}
  </div>

export default Picker