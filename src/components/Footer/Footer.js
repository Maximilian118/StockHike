import React from 'react'
import './_Footer.scss'
import { ResponsiveLine } from '@nivo/line'

const Footer = ({ user }) => 
  <div className="footer">
    {user.symbols.length > 0 && <ResponsiveLine
      data={[user.symbols[0].candles]}
      colors={['#3a3a3c']}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: user.symbols[0].candles.max * 2, stacked: false, reverse: true }}
      enableGridX={false}
      enableGridY={false}
      lineWidth={0}
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.3}
      enableCrosshair={false}
    />}
  </div>

export default Footer