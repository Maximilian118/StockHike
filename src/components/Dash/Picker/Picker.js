import React from 'react'
import './_Picker.scss'
import PickerItem from './PickerItem'

const Picker = ({ user }) => 
  <div className="picker">
    {
      user.symbols.map((symbol, i) => 
        <PickerItem 
        key={i} 
        symbol={symbol} 
        i={i} 
        total={user.symbols.length}
      />)
    }
  </div>

export default Picker