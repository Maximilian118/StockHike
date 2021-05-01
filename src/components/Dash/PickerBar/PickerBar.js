import React, { useContext } from 'react'
import { Context } from '../../../App'
import './_PickerBar.scss'
import PickerItem from './PickerItem'
import AddItem from './AddItem'

const PickerBar = ({ user }) => {
  const { setUser, picking, setPicking } = useContext(Context)

  return (
    <div className="picker-bar">
      {user.symbols && user.symbols.map((symbol, i) => 
        <PickerItem 
        key={i} 
        symbol={symbol}
        i={i} 
        total={user.symbols.length}
        user={user}
        setUser={setUser}
      />)}
      {!picking && 
        <AddItem 
        picking={picking} 
        setPicking={setPicking}
      />}
    </div>
  )
}

export default PickerBar