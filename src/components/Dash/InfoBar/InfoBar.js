import React from 'react'
import './_InfoBar.scss'
import moment from 'moment'

const InfoBar = () => 
  <div className="infobar">
    <h6>{moment().subtract(1, 'year').format("D MMM YYYY")} - {moment().format("D MMM YYYY")}</h6>
  </div>

export default InfoBar