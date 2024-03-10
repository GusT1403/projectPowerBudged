import React, { memo, useState } from "react"
import { Handle, Position } from "reactflow"
import { useOlt } from "../context/OltContext"
import { Link } from "react-router-dom"
import "./Ont.css"

const OntNode = ({ data }) => {
  const {olt} = useOlt()
  const [showPopup, setShowPopup] = useState(false)
  const OpPower = parseFloat(data.powerIn) - olt[0].connector
  const opPowerStyle = {
    color: OpPower < parseFloat(data.sensitivity) ? '#d62a11' : 'inherit',
    color: OpPower > parseFloat(data.overload) ? '#d62a10' : 'inherit',
  }
  return (
    <div className='ont-node'>
      <div className="info-circle" onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
        i
      </div>
      {showPopup && (
        <div className="popup">
        <div className="info-row">
          <p className="p1">Power In:</p>
          <p className="p2">{data.powerIn.toFixed(3)} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Power:</p>
          <p className="p2">{OpPower.toFixed(3)} dbm</p>
        </div>
        <div className="info-row">
          <p className="p1">Sensitivity:</p>
          <p className="p2">{data.sensitivity}</p>
        </div>
        <div className="info-row">
          <p className="p1">Overload:</p>
          <p className="p2">{data.overload}</p>
        </div>
      </div>
      )}
      <Handle
        id={`${data._id}-ont`}
        className='customHandle'
        position={Position.Left}
        type='target'
        isConnectable={true}
      />
      <div className='ont-title'>
        <h1>ONT</h1>
      </div>
      <div className='ont-data'>
        <p>Power:</p> <h3 style={opPowerStyle}>{`${OpPower.toFixed(3)}`}</h3> <h6>dB</h6>
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
