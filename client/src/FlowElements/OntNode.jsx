import React, { memo } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Ont.css"

const OntNode = ({ data }) => {
  return (
    <div className='ont-node'>
      <Handle
        id={`${data._id}-target`}
        className='customHandle'
        position={Position.Left}
        type='target'
        isConnectable={true}
      />
      <div className='ont-title'>
        <h1>ONT</h1>
      </div>
      <div className='ont-data'>
        <p>Overload:</p> <h3>{`${data.overload}`}</h3> <h6>db</h6>
      </div>
      <div className='ont-link'>
        <Link to={`/ont/${data._id}`} className='ont-edit'>
          Edit
        </Link>
      </div>
    </div>
  )
}

export default memo(OntNode)
