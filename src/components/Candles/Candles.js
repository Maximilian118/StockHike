import React from 'react'
import './_Candles.scss'
import { ResponsiveLine } from '@nivo/line'
import CandlesHover from './CandlesHover'

const Candles = ({ user }) => 
  <div className="candles">
    <ResponsiveLine
    data={user.symbols.map(symbol => symbol.candles)}
    colors={user.symbols.map(symbol => symbol.colour)}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    lineWidth={0}
    enablePoints={false}
    pointLabelYOffset={-24}
    enableArea={true}
    areaOpacity={1}
    enableCrosshair={false}
    useMesh={true}
    legends={[]}
    tooltip={value => 
      <CandlesHover symbol={{
        ...value.point,
        colour: value.point.color,
        symbol: value.point.serieId,
      }}/>
    }
    />
  </div>

export default Candles