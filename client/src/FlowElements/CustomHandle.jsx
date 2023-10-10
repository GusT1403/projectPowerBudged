import React, { useCallback, useMemo } from "react"
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow"

const selector =(nodeId, isConnectable = true, maxConnections = 1) => (s) => {
  if (!isConnectable) return false

    const node = s.nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], s.edges)

    return connectedEdges.length < maxConnections
}

const CustomHandle = ({ maxConnections, ...props }) => {
  const nodeId = useNodeId();
  const isConnectable = useStore(
    useCallback(selector(nodeId, props.isConnectable, maxConnections), [
      nodeId,
      props.isConnectable,
      maxConnections,
    ])
  )
  return <Handle {...props} type="target" isConnectable={isConnectable} />
}
export default CustomHandle