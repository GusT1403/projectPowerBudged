import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow'
import { useOlt } from "../context/OltContext";
import 'reactflow/dist/style.css'
import OltNode from "../FlowElements/OltNode";
import Sidebar from '../FlowElements/Sidebar'
import '../FlowElements/Flow.css'

const nodeTypes = { oltnode: OltNode };
const edgeTypes = {};

let id = 0
const getId = () => `dndnode_${id++}`

const WorkArea = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { createOlt, getOlts, olt } = useOlt();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
     const fetchData = async () => {
      await getOlts()
      setHasLoaded(true)
    };
    fetchData()
  }, [])
  
  useEffect(() => {
    if (hasLoaded && olt.length === 0) {
      const power = 0
      const connector = 0
      const coupler = 0
      const fusion = 0
      const maxDistance = 0
      const x = 100
      const y = 100
      const powerOut = 0
      const newData = { power, connector, coupler, fusion, maxDistance, powerOut, x, y }
      const createData = async () => {
        await createOlt(newData);
        await getOlts()
      };
      createData()
    }
    if(hasLoaded && olt.length === 1){
        const oltNode = {
          id: olt[0]._id,
          type: 'oltnode',
          position: { x: parseInt(olt[0].x) ,y: parseInt(olt[0].y) },
          data: olt[0],
        }
        setNodes((nds) => nds.concat(oltNode))
      }
  }, [hasLoaded, olt])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  return (
    <div className="dndflow">
      <ReactFlowProvider className="initial-flow">
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{ minWidth: '80vw', minHeight: '90vh', backgroundColor: '#6c6c6c', borderRadius: '12px'}}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background id="1" gap={10} lineWidth={0.4} color="#f1f1f1" variant={BackgroundVariant.Lines} />
            <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default WorkArea