import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_AddItem.scss'
import { Plus } from 'react-feather'

const AddItem = () => {
  const { exchange, setExchange } = useContext(Context)

  return (
    <div className="add-item">
      <p className="symbol">New</p>
      <Plus onClick={() => {
        setExchange({
          ...exchange,
          display: true,
        })
      }}/>
    </div>
  )
}

export default AddItem