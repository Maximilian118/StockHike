import React from 'react'
import './_Candles.scss'
import { ResponsiveLine } from '@nivo/line'
import { setColours } from '../../shared/utility'

const Candles = ({ user }) => 
  <div className="candles">
    {user.symbols.length > 0 && <ResponsiveLine
      data={user.symbols.map(symbol => symbol.candles).sort((a, b) => (a.max > b.max) ? 1 : -1)}
      colors={user.location.colours ? user.location.colours : setColours()}
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
        <div className="tooltip">
          <strong style={{ color: value.point.serieColor }}>{value.point.serieId}</strong>&nbsp;{value.point.data.y}
        </div>
      }
    />}
  </div>

export default Candles