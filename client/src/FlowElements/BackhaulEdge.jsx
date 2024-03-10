import React, { memo, useEffect, useState } from "react"
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow"
import { Link } from "react-router-dom"
import { useOlt } from "../context/OltContext"
import { useSplitter } from "../context/SplitterContext"
import { useTap } from "../context/TapContext"
import { useBackhaul } from "../context/BackhaulContext"
import { useOnt } from "../context/OntContext"
import "./Backhaul.css"

const BackhaulEdge = (props) => {
  const {
    data,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    sourceHandle,
    source,
    style = {
      strokeWidth: 2,
      stroke: '#E7E5E4',
    },
    markerEnd,
  } = props

  let inpuInfo = (data.sourceHandle).split('-')
  let outputInfo = (data.targetHandle).split('-')
  const [newdat, setNewdat ] = useState({})
  const [oltReady, setOltReady] = useState(false)
  
  const [showPopupe, setShowPopupe] = useState(false)

  const {olt, getOlts} = useOlt()
  const {getSplitter, updateSplitter} = useSplitter()
  const {getTap, updateTap} = useTap()
  const {updateBackhaul} = useBackhaul()
  const {updateOnt} = useOnt()

  useEffect(() => {
    const loadResources = async () => {
      await getOlts();
      setOltReady(true);
    };
    loadResources();
  }, []);

  useEffect(() => {
    if(inpuInfo[1] === 'olt' && oltReady){
      calculateOltData(olt[0], data)
    }
    else if(inpuInfo[1] === 'splitter' && oltReady){
      const loadSplitter = async () => {
        const splitter = await getSplitter(inpuInfo[0])
        console.log(splitter)
        calculateSplitterData(olt[0],splitter)
      }
      loadSplitter()
    }
    else if(inpuInfo[1] === 'insert'|| inpuInfo[1] === 'tap' && oltReady){
      const loadTap = async () => {
        const tap = await getTap(inpuInfo[0])
        calculateTapData(olt[0],tap)
      }
      loadTap()
    }
  }, [oltReady])

  const calculateOltData = (olt, inf) => {
    const cablesd = parseFloat(data.cablesd)
    const cablesr = parseFloat(data.cablesr)
    const distance = parseFloat(data.distance)
    const roll = parseFloat(olt.roll)
    const attenuation = parseFloat(data.attenuation)
    const fusion = parseFloat(olt.fusion)
    let crossarms = 0
    let odistance = 0
    let fusions = 0
    let powerOut = 0
    let powerIn = olt.powerOut
    if(distance === 0 ){powerOut = (olt.powerOut - olt.fusion)    }
    if(cablesd != 0 && roll != 0){crossarms = Math.ceil((distance/1000) / (cablesd / roll))}
    if(crossarms != 0 && cablesr != 0 && roll != 0) {odistance = (crossarms * (cablesr)) + distance}
    if(odistance != 0 && roll != 0) {fusions = (Math.ceil(odistance / roll)) - 1}
    if(distance !=0 && powerIn !=0 && attenuation !=0 && odistance !=0 && fusions !=0 && fusion !=0){powerOut = (powerIn -(attenuation * (odistance/1000)) - (fusions * fusion))- fusion}
    const newData = { crossarms, odistance, powerIn, powerOut }
    const newD = { crossarms, odistance, powerIn, fusions, powerOut }
    setNewdat(newD)
    updateBackhaul(data._id, newData)
    if(outputInfo[1] === 'tap'){
      const load = async () => {
      await updateTap(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'splitter'){
      const load = async () => {
      await updateSplitter(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'ont'){
      const load = async () => {
      await updateOnt(outputInfo[0], {powerIn: powerOut})
      }
      load()
    }
  }

  const calculateSplitterData = (olt, splitter) => {
    const cablesd = parseFloat(data.cablesd)
    const cablesr = parseFloat(data.cablesr)
    const distance = parseFloat(data.distance)
    const roll = parseFloat(olt.roll)
    const attenuation = parseFloat(data.attenuation)
    const fusion = parseFloat(olt.fusion)
    let crossarms = 0
    let odistance = 0
    let fusions = 0
    let powerOut = 0
    const powerIn = splitter.out
    if(distance === 0 ){powerOut = (splitter.out - olt.fusion)}
    if(cablesd != 0 && roll != 0){crossarms = Math.ceil((distance/1000) / (cablesd / roll))}
    if(crossarms != 0 && cablesr != 0 && roll != 0) {odistance = (crossarms * (cablesr)) + distance} else {
      odistance = distance
    }
    if(odistance != 0 && roll != 0) {fusions = (Math.ceil(odistance / roll)) - 1} else {
      fusions = (Math.ceil(odistance / roll)) - 1
    }
    if(distance !=0 && powerIn !=0 && attenuation !=0 && odistance !=0 && fusions !=0 && fusion !=0){
      powerOut = (powerIn -(attenuation * (odistance/1000)) - (fusions * fusion))- fusion}
    const newData = { crossarms, odistance, powerIn, powerOut }
    const newD = { crossarms, odistance, powerIn, fusions, powerOut }
    setNewdat(newD)
    updateBackhaul(data._id, newData)
    if(outputInfo[1] === 'tap'){
      const load = async () => {
      await updateTap(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'splitter'){
      const load = async () => {
      await updateSplitter(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'ont'){
      const load = async () => {
      await updateOnt(outputInfo[0], {powerIn: powerOut})
      }
      load()
    }
  }

  const calculateTapData = (olt, tap) => {
    const cablesd = parseFloat(data.cablesd)
    const cablesr = parseFloat(data.cablesr)
    const distance = parseFloat(data.distance)
    const roll = parseFloat(olt.roll)
    const attenuation = parseFloat(data.attenuation)
    const fusion = parseFloat(olt.fusion)
    let crossarms = 0
    let odistance = 0
    let fusions = 0
    let powerOut = 0
    let powerIn = 0
    if(inpuInfo[1] === "tap"){if(distance === 0 ){powerOut = (tap.tapout - olt.fusion)}
      powerIn = tap.tapout
    } else if(inpuInfo[1] === "insert"){if(distance === 0 ){powerOut = (tap.insertout - olt.fusion)}
      powerIn = tap.insertout
    }
    if(cablesd != 0 && roll != 0){crossarms = Math.ceil((distance/1000) / (cablesd / roll))}
    if(crossarms != 0 && cablesr != 0 && roll != 0) {odistance = (crossarms * (cablesr)) + distance}  else {
      odistance = distance
    }
    if(odistance != 0 && roll != 0) {fusions = (Math.ceil(odistance / roll)) - 1}  else {
      fusions = (Math.ceil(odistance / roll)) - 1
    }
    if(distance !=0 && powerIn !=0 && attenuation !=0 && odistance !=0 && fusions !=0 && fusion !=0){powerOut = (powerIn -(attenuation * (odistance/1000)) - (fusions * fusion))- fusion}
    const newData = { crossarms, odistance, powerIn, powerOut }
    const newD = { crossarms, odistance, powerIn, fusions, powerOut }
    setNewdat(newD)
    updateBackhaul(data._id, newData)
    if(outputInfo[1] === 'tap'){
      const load = async () => {
      await updateTap(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'splitter'){
      const load = async () => {
      await updateSplitter(outputInfo[0], {powerIn: powerOut})
      }
      load()
    } if(outputInfo[1] === 'ont'){
      const load = async () => {
      await updateOnt(outputInfo[0], {powerIn: powerOut})
      }
      load()
    }
  }

  const distance = (parseFloat(data.distance)).toFixed(3)
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd || ''}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            background: '#494E68',
            border: '2px solid #D7D5D3',
            color:'#E7E5E4',
            cursor: 'pointer',
            borderRadius: '26%',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 8,
            pointerEvents: 'all',
            padding: '10px',
            maxWidth: '80px',
          }}
          className="nodrag-bh"
          
        >
          <div className="inf-circle" onMouseEnter={() => setShowPopupe(true)} onMouseLeave={() => setShowPopupe(false)}>
        i
      </div>
        {showPopupe && (
          <div className="popupe">
          <div className="inf-row">
            <p className="p1">Power In:</p>
            <p className="p2">{newdat.powerIn.toFixed(3)} dbm</p>
          </div>
          <div className="inf-row">
            <p className="p1">Fiber attenuation:</p>
            <p className="p2">{data.attenuation} db</p>
          </div>
          <div className="inf-row">
            <p className="p1">Fusions quantity:</p>
            <p className="p2">{newdat.fusions}</p>
          </div>
          <div className="inf-row">
            <p className="p1">Crossarms quantity:</p>
            <p className="p2">{newdat.crossarms}</p>
          </div>
          <div className="inf-row">
            <p className="p1">Optical distance:</p>
            <p className="p2">{newdat.odistance} m</p>
          </div>
          <div className="inf-row">
            <p className="p1">Power out:</p>
            <p className="p2">{newdat.powerOut.toFixed(3)} dbm</p>
          </div>
        </div>
        )}
          <div className='bh-title'>
            <p>Distance: </p>
          </div>
          
          <div className="bh-dist">
            <h3>{`${distance}`}</h3> <h4>m</h4>
          </div>
          <div className='bh-link'>
            <Link to={`/backhaul/${data._id}`} className='bh-edit'>
              Edit
            </Link>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(BackhaulEdge)