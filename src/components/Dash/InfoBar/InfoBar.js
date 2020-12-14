import React from 'react'
import './_InfoBar.scss'
import moment from 'moment'

const InfoBar = ({ exchange }) => 
  <div className="infobar">
    {exchange.data ? 
      <h6>{`Exchange: ${exchange.exchange}`}</h6> :
      <h6>{moment().subtract(1, 'year').format("D MMM YYYY")} - {moment().format("D MMM YYYY")}</h6>
    }
  </div>

export default InfoBar