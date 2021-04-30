import React, { useState } from 'react'
import './_InfoBar.scss'
import moment from 'moment'
import { ChevronUp } from 'react-feather'

const InfoBar = ({ exchange }) => {
  const [ flipSVG, setflipSVG ] = useState(false)

  return (
    <div className="infobar">
      {exchange.display && exchange.data ?
        <div className="exchange-select" onClick={() => setflipSVG(!flipSVG)}>
          <h6>{`Exchange: ${exchange.exchange}`}</h6>
          <ChevronUp className={flipSVG ? "flipSVG" : "undifined"}/>
        </div> 
        :
        <h6>{moment().subtract(1, 'year').format("D MMM YYYY")} - {moment().format("D MMM YYYY")}</h6>
      }
    </div>
  )
}

export default InfoBar