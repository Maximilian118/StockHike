import React from 'react'
import './_Picker.scss'
import PickerTicker from './PickerTicker'
import { finnHubExchanges } from '../../../../shared/utility'

const Picker = () => {
  

  return (
    <div className="picker">
      <div className="picker-col">
        {Object.keys(finnHubExchanges).map((symbol, i) => 
          <PickerTicker 
          key={i} 
          symbol={symbol}
        />)}
      </div>
      <div className="picker-col">

      </div>
      <div className="picker-col">

      </div>
    </div>
  )
}

export default Picker