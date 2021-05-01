import React from 'react'
import './_AddItem.scss'
import { Plus } from 'react-feather'

const AddItem = ({ picking, setPicking }) => 
  <div className="add-item" onClick={() => setPicking(!picking)}>
    <p className="symbol">New</p>
    <Plus/>
  </div>

export default AddItem