import React, { useState, useRef, useCallback, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow"
import { useOlt } from "../context/OltContext"
import { useOnt } from "../context/OntContext"
import { useSplitter } from "../context/SplitterContext"
import { useTap } from "../context/TapContext"
import "reactflow/dist/style.css"
import OltNode from "../FlowElements/OltNode"
import OntNode from "../FlowElements/OntNode"
import SplitterNode from "../FlowElements/SplitterNode"
import TapNode from "../FlowElements/TapNode"
import Sidebar from "../FlowElements/Sidebar"
import "../FlowElements/Flow.css"

const nodeTypes = {
  oltnode: OltNode,
  ontnode: OntNode,
  splitternode: SplitterNode,
  tapnode: TapNode,
}
const edgeTypes = {}

let id = 0
const getId = () => `dndnode_${id++}`

const proOptions = { hideAttribution: true }
const initialViewport = { x: 500, y: 150, zoom: 1.2 }

const WorkArea = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const { createOlt, getOlts, olt } = useOlt()
  const { createOnt, getOnts, ont } = useOnt()
  const { createSplitter, getSplitters, splitter } = useSplitter()
  const { createTap, getTaps, tap } = useTap()

  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await getOlts()
      await getOnts()
      await getSplitters()
      await getTaps()
      setHasLoaded(true)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (hasLoaded && olt.length === 0) {
      const power = 0
      const connector = 0
      const coupler = 0
      const fusion = 0
      const maxDistance = 0
      const x = -200
      const y = 200
      const powerOut = 0
      const newData = {
        power,
        connector,
        coupler,
        fusion,
        maxDistance,
        powerOut,
        x,
        y,
      }
      const createData = async () => {
        await createOlt(newData)
        await getOlts()
      }
      createData()
    }
    if (hasLoaded && olt.length === 1) {
      const oltNode = {
        id: olt[0]._id,
        type: "oltnode",
        position: { x: parseInt(olt[0].x), y: parseInt(olt[0].y) },
        data: olt[0],
      }
      setNodes((nds) => nds.concat(oltNode))
    }
  }, [hasLoaded, olt])

  useEffect(() => {
    if (hasLoaded && ont.length > 0) {
      const ontNodes = ont.map((item) => {
        return {
          id: item._id,
          type: "ontnode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      setNodes((nds) => nds.concat(ontNodes))
    }
  }, [hasLoaded, ont])

  useEffect(() => {
    if (hasLoaded && splitter.length > 0) {
      const splitterNodes = splitter.map((item) => {
        return {
          id: item._id,
          type: "splitternode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      setNodes((nds) => nds.concat(splitterNodes))
    }
  }, [hasLoaded, splitter])

  useEffect(() => {
    if (hasLoaded & (tap.length > 0)) {
      const TapNodes = tap.map((item) => {
        return {
          id: item._id,
          type: "tapnode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      setNodes((nds) => nds.concat(TapNodes))
    }
  }, [hasLoaded, tap])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      if (typeof type === "undefined" || !type) {
        return
      }
      if (type === "ontnode") {
        const sensitivity = 0
        const overload = 0
        const x = position.x
        const y = position.y
        const newData = { sensitivity, overload, x, y }
        const createData = async () => {
          await createOnt(newData)
          await getOnts()
        }
        createData()
      }
      if (type === "splitter") {
        const configuration = "1/2"
        const out = 0
        const x = position.x
        const y = position.y
        const newData = { configuration, out, x, y }
        const createData = async () => {
          await createSplitter(newData)
          await getSplitters()
        }
        createData()
      }
      if (type === "tap") {
        const configuration = "1|99"
        const insert = 0
        const tap = 0
        const x = position.x
        const y = position.y
        const newData = { configuration, insert, tap, x, y }
        const createData = async () => {
          await createTap(newData)
          await getTaps()
        }
        createData()
      }
    },
    [reactFlowInstance]
  )

  return (
    <div className='dndflow'>
      <ReactFlowProvider className='initial-flow'>
        <Sidebar />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              minWidth: "80vw",
              minHeight: "90vh",
              backgroundColor: "#6c6c6c",
              borderRadius: "12px",
            }}
            nodeTypes={nodeTypes}
            defaultViewport={initialViewport}
            proOptions={proOptions}
          >
            <Background
              id='1'
              gap={10}
              lineWidth={0.4}
              color='#f1f1f1'
              variant={BackgroundVariant.Lines}
            />
            <Background
              id='2'
              gap={100}
              offset={1}
              color='#ccc'
              variant={BackgroundVariant.Lines}
            />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default WorkArea
