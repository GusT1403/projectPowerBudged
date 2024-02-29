import React, { memo, useState } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Splitter.css"

const SplitterNode = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false)
  console.log("splitter", data)
  return (
    <div className='splitter-node'>
      <div className="info-circle" onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
        i
      </div>
      {showPopup && (
        <div className="popup">
        <div className="info-row">
          <p className="p1">Power In:</p>
          <p className="p2">{data.powerIn} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Power Out:</p>
          <p className="p2">{data.out} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Configuration:</p>
          <p className="p2">{data.configuration}</p>
        </div>
      </div>
      )}
      <Handle
        id={`${data._id}-splitter`}
        className='inHandle'
        position={Position.Left}
        type='target'
        isConnectable={1}
      />
      <Handle
      id={`${data._id}-splitter`}
        className='outHandle'
        position={Position.Right}
        type='source'
        isConnectable={true}
      />
      <div className='splitter-title'>
        <h1>NAP</h1>
        <h6>splitter</h6>
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
