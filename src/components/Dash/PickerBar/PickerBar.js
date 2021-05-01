import React from 'react'
import './_PickerBar.scss'
import PickerItem from './PickerItem'
import AddItem from './AddItem'

const PickerBar = ({ user }) => 
  <div className="picker-bar">
    {user.symbols && user.symbols.map((symbol, i) => 
      <PickerItem 
      key={i} 
      symbol={symbol}
      i={i} 
      total={user.symbols.length}
    />)}
    <AddItem/>
  </div>

export default PickerBar