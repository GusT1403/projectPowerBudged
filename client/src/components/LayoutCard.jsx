import React from 'react'
import './Cards.css'
import { useLayouts } from '../context/LayoutContext'
import { Link } from "react-router-dom";

function LayoutCard({ layout }) {
  const {deleteLayout} = useLayouts()
  return (
      <div className='card'>
        <h1 className='title'>{layout.title}</h1>
        <p className='description'>{layout.description}</p>
        <p className='date'>{new Date(layout.date).toLocaleDateString()}</p>
        <div className='actions'>
          <button className='btn btn--act' onClick={() => deleteLayout(layout._id)}>Del</button>
          <Link to={`/layouts/${layout._id}`} className='btn btn--act'>Edit</Link>
        </div>
      </div>
  )
}

export default LayoutCard
