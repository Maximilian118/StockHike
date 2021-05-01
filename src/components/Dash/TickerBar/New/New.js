import React from 'react'
import './_New.scss'
import { Plus } from 'react-feather'

const New = ({ picking, setPicking }) => 
  <div className="new" onClick={() => setPicking(!picking)}>
    <p className="symbol">New</p>
    <Plus/>
  </div>

export default New