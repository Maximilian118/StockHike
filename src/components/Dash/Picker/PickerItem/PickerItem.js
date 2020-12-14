import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_PickerItem.scss'
import { ChevronUp, ChevronDown, X } from 'react-feather'
import { removeSymbol } from '../../../../shared/utility'

const PickerItem = ({ symbol, i, total, exchange }) => {
  const { user, setUser } = useContext(Context)

  return (
    <div className={`picker-item ${exchange.display && `display-btns`}`}>
      <div className="symbol-colour-circle" style={{ background: symbol.colour }}/>
      <p className="symbol">{symbol.symbol}</p>
      <p className="last-price">{Number(symbol.candles.data.slice(-1)[0].y).toFixed(2)}</p>
      <div className="btns">
        {i !== total - 1 && <ChevronDown style={{ marginRight: i === 0 ? 18 : 0 }}/>}
        {i !== 0 && <ChevronUp/>}
        <X className="remove" onClick={() => removeSymbol(user, setUser, symbol)}/>
      </div>
    </div>
  )
}

export default PickerItem