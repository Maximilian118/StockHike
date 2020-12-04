import React from 'react'
import './_Candles.scss'
import { ResponsiveLine } from '@nivo/line'
import { setColours } from '../../shared/utility'
import PickerItem from '../Dash/Picker/PickerItem'

const Candles = ({ user }) => 
  <div className="candles">
    {user.symbols.length > 0 && <ResponsiveLine
      data={user.symbols.map(symbol => symbol.candles)}
      colors={user.symbols.length !== 0 ? user.symbols.map(symbol => symbol.colour) : setColours()}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      enableGridX={false}
      enableGridY={false}
      lineWidth={0}
      enablePoints={false}
      enableArea={true}
      areaOpacity={1}
      enableCrosshair={false}
      useMesh={true}
      tooltip={value => 
        <PickerItem symbol={{
          ...value.point,
          colour: value.point.color,
          symbol: value.point.serieId,
        }}/>
      }
    />}
  </div>

export default Candles