import React from 'react'
import './_PickerTicker.scss'
import { ChevronRight } from 'react-feather'

const PickerTicker = ({ symbol, setPickerStage }) => 
  <div className="picker-ticker" onClick={() => setPickerStage && setPickerStage(symbol)}>
    <p className="symbol">{symbol}</p>
    <ChevronRight/>
  </div>

export default PickerTicker