import React, { useState, useRef, useCallback, useEffect, useMemo } from "react"
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow"
import { useOlt } from "../context/OltContext"
import { useBackhaul } from "../context/BackhaulContext"
import { useOnt } from "../context/OntContext"
import { useSplitter } from "../context/SplitterContext"
import { useTap } from "../context/TapContext"
import "reactflow/dist/style.css"
import OltNode from "../FlowElements/OltNode"
import OntNode from "../FlowElements/OntNode"
import SplitterNode from "../FlowElements/SplitterNode"
import TapNode from "../FlowElements/TapNode"
import Sidebar from "../FlowElements/Sidebar"
import BackhaulEdge from "../FlowElements/BackhaulEdge"
import ConnectionLine from "../FlowElements/ConnectionLine"
import Loading from "./Loading"
import "../FlowElements/Flow.css"

const proOptions = { hideAttribution: true }
const initialViewport = { x: 500, y: 150, zoom: 1.2 }
console.log("WorkArea reloaded")
const WorkArea = () => {

  const nodeTypes = useMemo(() => ({
    oltnode: OltNode,
    ontnode: OntNode,
    splitternode: SplitterNode,
    tapnode: TapNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    backhaulEdge: BackhaulEdge,
  }), [])

  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const { updateOlt, createOlt, getOlts, olt } = useOlt()
  const { updateOnt, createOnt, getOnts, ont } = useOnt()
  const { updateSplitter, createSplitter, getSplitters, splitter } = useSplitter()
  const { updateTap, createTap, getTaps, tap } = useTap()
  const { createBackhaul, getBackhauls, backhaul } = useBackhaul()

  const [hasLoaded, setHasLoaded] = useState(false)
  const [complete, setComplete] = useState(false)


  console.log("OLT", olt)
  console.log("ONT", ont)
  console.log("SPLITTER", splitter)
  console.log("TAP", tap)
  console.log("BH", backhaul)


  useEffect(() => {
    const fetchData = async () => {
      await getOlts()
      await getOnts()
      await getSplitters()
      await getTaps()
      await getBackhauls()
      setHasLoaded(true)
    }
    fetchData()
  }, [])

  useEffect(() => {
  const allDependencies = [hasLoaded, olt, ont, splitter, tap, backhaul];
  const hasAnyDependencyChanged = allDependencies.some((dependency, index) => {
    return (
      index === 0 ||
      !Object.is(dependency, allDependencies[index - 1])
    )
  })

  if (hasAnyDependencyChanged) {
    const updatedNodes = [];

    if (olt.length > 0) {
      const oltNode = {
        id: olt[0]._id,
        type: "oltnode",
        position: { x: parseInt(olt[0].x), y: parseInt(olt[0].y) },
        data: olt[0],
      }
      updatedNodes.push(oltNode);
    }

    if (ont.length > 0) {
      const ontNodes = ont.map((item) => {
        return {
          id: item._id,
          type: "ontnode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      updatedNodes.push(...ontNodes);
    }

    if (splitter.length > 0) {
      const splitterNodes = splitter.map((item) => {
        return {
          id: item._id,
          type: "splitternode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      updatedNodes.push(...splitterNodes);
    }

    if (tap.length > 0) {
      const tapNodes = tap.map((item) => {
        return {
          id: item._id,
          type: "tapnode",
          position: { x: parseInt(item.x), y: parseInt(item.y) },
          data: item,
        }
      })
      updatedNodes.push(...tapNodes)
    }

    const updatedEdges = backhaul.map((item) => {
      return {
        id: item._id,
        source: item.source,
        target: item.target,
        sourceHandle: item.sourceHandle,
        targetHandle: item.targetHandle,
        type: "backhaulEdge",
        animated: true,
        data: item,
      }
    })
    setNodes(updatedNodes)
    setEdges(updatedEdges)
    setComplete(true)
    console.log("reloaded")
  }
}, [hasLoaded, olt, ont, splitter, tap, backhaul, location.pathname])

  useEffect(() => {
    if (hasLoaded && olt.length === 0) {
      const power = 0
      const connector = 0
      const coupler = 0
      const fusion = 0
      const maxDistance = 0
      const roll = 0
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
        roll,
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
      if (hasLoaded && backhaul.length > 0) {
      const backhaulEdges = backhaul.map((item) => {
        return {
          id: item._id,
          source: item.source,
          target: item.target,
          sourceHandle: item.sourceHandle,
          targetHandle: item.targetHandle,
          type: "backhaulEdge",
          animated: true,
          data: item,
        }
      })
      setEdges(backhaulEdges)
    }
    
  }, [hasLoaded, backhaul])

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

  console.log("OLT", olt)
  console.log("ONT", ont)
  console.log("SPLITTER", splitter)
  console.log("TAP", tap)
  console.log("BH", backhaul)

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback((event) => {
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
        const powerIn = 0
        const x = position.x
        const y = position.y
        const newData = { sensitivity, overload, powerIn, x, y }
        const createData = async () => {
          await createOnt(newData)
          await getOnts()
        }
        createData()
      }
      if (type === "splitter") {
        const configuration = "1/2"
        const powerIn = 0
        const out = 0
        const loss = 0
        const x = position.x
        const y = position.y
        const newData = { configuration, powerIn, out, loss, x, y }
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
        const insertout = 0
        const tapout = 0
        const x = position.x
        const y = position.y
        const powerIn = 0
        const newData = { configuration, insert, tap, insertout, tapout, x, y, powerIn }
        const createData = async () => {
          await createTap(newData)
          await getTaps()
        }
        createData()
      }
    },
    [reactFlowInstance]
  )

  const onNodeDragStop = useCallback((event, node) => {
    event.preventDefault()
    if(node.type === 'oltnode'){
      const x = node.position.x
      const y = node.position.y
      const newData = {x, y}
      const updateData = async () => {
        await updateOlt(node.id, newData)
      }
      updateData()
    }
    if(node.type === 'ontnode'){
      const x = node.position.x
      const y = node.position.y
      const newData = {x, y}
      const updateData = async () => {
        await updateOnt(node.id, newData)
      }
      updateData()
    }
    if(node.type === 'splitternode'){
      const x = node.position.x
      const y = node.position.y
      const newData = {x, y}
      const updateData = async () => {
        await updateSplitter(node.id, newData)
      }
      updateData()
    }
    if(node.type === 'tapnode'){
      const x = node.position.x
      const y = node.position.y
      const newData = {x, y}
      const updateData = async () => {
        await updateTap(node.id, newData)
      }
      updateData()
    }
    
  }, [])

    const onConnect = (params) => {
      const { source, target, sourceHandle, targetHandle } = params
      console.log(params)
        const attenuation = 0
        const cablesd = 0
        const cablesr = 0
        const odistance = 0
        const distance = 0
        const powerIn = 0
        const powerOut = 0
        const crossarms = 0
        target
        source
        sourceHandle
        targetHandle
        const newData = { attenuation, cablesd, cablesr, crossarms, odistance, distance, powerIn, powerOut, target, source, sourceHandle, targetHandle }

        const edgeExists = edges.some(edge => edge.source === source && edge.target === target)

        if (!edgeExists) {
          setEdges((prevEdges) => [...prevEdges, newData])
          const createData = async () => {
            await createBackhaul(newData)
            await getBackhauls()
          };
          createData()
        } else {
          console.log("El edge ya existe, no se añadirá de nuevo")
        }
    }
if(!complete){
  return(
    <ReactFlowProvider className='initial-flow'>
      <Sidebar />
      <Loading></Loading>
    </ReactFlowProvider>
    
  )
} else{

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
            onNodeDragStop={onNodeDragStop}
            connectionLineComponent={ConnectionLine}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              minWidth: "80vw",
              minHeight: "90vh",
              backgroundColor: "#25252597",
              borderRadius: "12px",
            }}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultViewport={initialViewport}
            proOptions={proOptions}
          >
            <Background
              id='1'
              gap={10}
              lineWidth={0.4}
              color='#E7E5E4'
              variant={BackgroundVariant.Lines}
            />
            <Background
              id='2'
              gap={100}
              offset={1}
              color='#E7E5E4'
              variant={BackgroundVariant.Lines}
            />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )  
}
}

export default WorkArea
