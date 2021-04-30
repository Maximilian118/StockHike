import React from 'react'
import './_InfoBar.scss'
import moment from 'moment'

const InfoBar = ({ exchange, setExchange }) => 
  <div className="infobar">
    {exchange.display ?
      <>
        <h6>{`Exchange: ${exchange.exchange ? exchange.exchange : ""}`}</h6>
        <h6 className="back" onClick={() => setExchange({ display: true })}>{exchange.exchange && "Back"}</h6>
      </>
      :
      <h6>{moment().subtract(1, 'year').format("D MMM YYYY")} - {moment().format("D MMM YYYY")}</h6>
    }
  </div>

export default InfoBar