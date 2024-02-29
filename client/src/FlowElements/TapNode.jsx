import React, { memo, useState } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Tap.css"

const TapNode = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [showTap, setShowTap] = useState(false)
  const [showInsert, setShowInsert] = useState(false)
  return (
    <div className='tap-node'>
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
          <p className="p1">TAP output:</p>
          <p className="p2">{data.tapout} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">INSERT output:</p>
          <p className="p2">{data.insertout} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Configuration:</p>
          <p className="p2">{data.configuration}</p>
        </div>
      </div>
      )}
      <Handle
        id={`${data._id}-tap`}
        className='inHandle'
        position={Position.Left}
        type='target'
        isConnectable={1}
        isConnectableEnd
        
      />
      <Handle
        id={`${data._id}-insert`}
        className='insertHandle'
        position={Position.Right}
        type='source'
        isConnectable={true}
        onMouseEnter={() => setShowInsert(true)} onMouseLeave={() => setShowInsert(false)}
      />
      {showInsert && (
        <div className="popinsert">
        <div className="info-row">
          <p className="p1">Insert out</p>
          <p className="p2">{data.insertout}</p>
        </div>
      </div>
      )}
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
      <Handle
        id={`${data._id}-tap`}
        className='tapHandle'
        position={Position.Bottom}
        type='source'
        isConnectable={true}
        onMouseEnter={() => setShowTap(true)} onMouseLeave={() => setShowTap(false)}
      />
      {showTap && (
        <div className="poptap">
        <div className="info-row">
          <p className="p1">Tap Out</p>
          <p className="p2">{data.tapout}</p>
        </div>
      </div>
      )}
    </div>
    
  )
}

export default memo(TapNode)
