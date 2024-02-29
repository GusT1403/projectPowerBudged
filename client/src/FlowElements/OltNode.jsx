import React, { memo, useState } from "react"
import { Handle, Position } from "reactflow"
import { Link } from "react-router-dom"
import "./Olt.css"

const OltNode = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className='olt-node'>
      <Handle
        id={`${data._id}-olt`}
        className='customHandle'
        position={Position.Right}
        type='source'
        isConnectableStart
        isConnectable={1}
      />
      <div className="info-circle" onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
        i
      </div>
      {showPopup && (
        <div className="popup">
        <div className="info-row">
          <p className="p1">Power Out:</p>
          <p className="p2">{data.powerOut} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Coil cable length:</p>
          <p className="p2">{data.roll} m</p>
        </div>
        <div className="info-row">
          <p className="p1">Fusions loss:</p>
          <p className="p2">{data.fusion} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Max link distance:</p>
          <p className="p2">{data.maxDistance} km</p>
        </div>
      </div>
      )}
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
      <div className="popup">
        {
          <p>Power Out: {data.powerOut}</p>
        }
      </div>
    </div>
  )
}

export default memo(OltNode)