import React from 'react'
import './_Candles.scss'
import { ResponsiveLine } from '@nivo/line'

const Candles = ({ user }) => 
  <div className="candles">
    {Object.keys(user.symbols).length > 0 && <ResponsiveLine
      data={user.symbols.map(symbol => symbol.candles).sort((a, b) => (a.max > b.max) ? 1 : -1)}
      colors={['#3a3a3c', '#f36b22', '#fcb116']}
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
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={1}
      tooltip={value => 
        <div className="tooltip">
          <strong style={{ color: value.point.borderColor }}>{value.point.serieId}</strong>&nbsp;{value.point.data.y}
        </div>
      }
      enableCrosshair={false}
      useMesh={true}
      legends={[]}
    />}
  </div>

export default Candles