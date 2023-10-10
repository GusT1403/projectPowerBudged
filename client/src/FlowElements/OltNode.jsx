import React, { memo, useEffect } from 'react'
import { useOlt } from "../context/OltContext"
import { Position } from "reactflow"
import CustomHandle from './CustomHandle.jsx'

const OltNode = ({ data }) => {

  const { isConnectable, maxConnections } = data

  const { getOlts, olt } = useOlt()
  useEffect(() => {
    getOlts()
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        width: '200px',
        height: '100px',
        border: '1px solid #1a192b',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomHandle position={Position.Right} isConnectable={isConnectable} maxConnections={maxConnections}/>
      <span>Power Out:</span>
    </div>
  )
}

export default OltNode
