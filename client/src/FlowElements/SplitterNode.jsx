import React, { memo } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Splitter.css"

const SplitterNode = ({ data }) => {
  return (
    <div className='splitter-node'>
      <Handle
        className='inHandle'
        position={Position.Left}
        type='target'
        isConnectable={{ isConnectable: true }}
      />
      <Handle
        className='outHandle'
        position={Position.Right}
        type='source'
        isConnectable={{ isConnectable: true }}
      />
      <div className='splitter-title'>
        <h1>SPLITTER</h1>
      </div>
      <div className='splitter-data'>
        {" "}
        <p>Configuration:</p> <h3>{`${data.configuration}`}</h3>
      </div>
      <div className='splitter-link'>
        <Link to={`/splitter/${data._id}`} className='splitter-edit'>
          Edit
        </Link>
      </div>
    </div>
  )
}

export default memo(SplitterNode)
