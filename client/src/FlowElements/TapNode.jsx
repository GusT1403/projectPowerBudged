import React, { memo } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Tap.css"

const TapNode = ({ data }) => {
  return (
    <div className='tap-node'>
      <Handle
        className='inHandle'
        position={Position.Left}
        type='target'
        isConnectable={{ isConnectable: true }}
      />
      <Handle
        className='insertHandle'
        position={Position.Right}
        type='source'
        isConnectable={{ isConnectable: true }}
      />
      <Handle
        className='tapHandle'
        position={Position.Bottom}
        type='source'
        isConnectable={{ isConnectable: true }}
      />
      <div className='tap-title'>
        <h1>TAP</h1>
      </div>
      <div className='tap-data'>
        {" "}
        <p>Configuration:</p> <h3>{`${data.configuration}`}</h3>
      </div>
      <div className='tap-link'>
        <Link to={`/tap/${data._id}`} className='tap-edit'>
          Edit
        </Link>
      </div>
    </div>
  )
}

export default memo(TapNode)
