import React from 'react'
import './_AddItem.scss'
import { Plus } from 'react-feather'

const AddItem = () => 
  <div className="add-item">
    <p className="symbol new">New</p>
    <Plus/>
  </div>

export default AddItem