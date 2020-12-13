import React, { useEffect } from 'react'
import { getExchange } from '../../shared/APIRequests'
import './_Exchange.scss'

const Exchange = ({ exchange, setExchange }) => {
  useEffect(() => {
    !exchange.data && getExchange("AS", exchange, setExchange)
  }, [exchange, setExchange])

  return (
    <div className="exchange">

    </div>
  )
}

export default Exchange