import React from 'react'
import './_Candles.scss'
import { ResponsiveLine } from '@nivo/line'

const Candles = ({ user }) => {
  const symbolXYData = []

  for (const symbol in user.symbols) {
    symbol !== "defaults" && symbolXYData.push(user.symbols[symbol].xy)
  }

  return (
    <div className="candles">
      {Object.keys(user.symbols).length > 0 && <ResponsiveLine
        data={symbolXYData}
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
        enableCrosshair={false}
        useMesh={true}
        legends={[]}
      />}
    </div>
  )
}

export default Candles