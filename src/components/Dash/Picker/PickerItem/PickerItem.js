import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_PickerItem.scss'
import { ChevronUp, ChevronDown, X } from 'react-feather'
import { removeSymbol } from '../../../../shared/utility'

const PickerItem = ({ symbol, i, total }) => {
  const { user, setUser } = useContext(Context)

  return (
    <div className={`picker-item ${symbol.y && `bg`}`}>
      <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
      <p className="symbol">{symbol.symbol}</p>
      <p className="last-price">{symbol.candles ? Number(symbol.candles.data.slice(-1)[0].y).toFixed(2) : symbol.data.y}</p>
      {!symbol.y && <div className="btns">
        {i !== total - 1 && <ChevronDown style={{ marginRight: i === 0 ? 18 : 0 }}/>}
        {i !== 0 && <ChevronUp/>}
        <X className="remove" onClick={() => removeSymbol(user, setUser, symbol)}/>
      </div>}
    </div>
  )
}

export default PickerItem