import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_AddItem.scss'
import { Plus } from 'react-feather'
import { getExchange } from '../../../../shared/APIRequests'

const AddItem = () => {
  const { exchange, setExchange } = useContext(Context)

  return (
    <div className="add-item">
      <p className="symbol">New</p>
      <Plus onClick={() => !exchange && getExchange("AS", setExchange)}/>
    </div>
  )
}

export default AddItem