import React, { memo } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Olt.css"

const OltNode = ({ data }) => {
  return (
    <div className='olt-node'>
      <Handle
        className='customHandle'
        position={Position.Right}
        type='source'
        isConnectable={{ isConnectable: true }}
      />
      <div className='olt-title'>
        <h1>OLT</h1>
      </div>
      <div className='olt-data'>
        {" "}
        <p>Power out:</p> <h3>{`${data.powerOut}`}</h3> <h6>dbm</h6>
      </div>
      <div className='olt-link'>
        <Link to={`/olt/${data._id}`} className='olt-edit'>
          Edit
        </Link>
      </div>
    </div>
  )
}

export default memo(OltNode)