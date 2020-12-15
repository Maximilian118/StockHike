import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_Done.scss'
import { Check } from 'react-feather'

const Done = () => {
  const { exchange, setExchange } = useContext(Context)

  return (
    <div className="done">
      <p className="symbol">Done</p>
      <Check onClick={() => {
        setExchange({
          ...exchange,
          display: false,
        })
      }}/>
    </div>
  )
}

export default Done