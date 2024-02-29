import React from "react"
import "../FlowElements/Flow.css"
import { Link } from "react-router-dom";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.stopPropagation()
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the work area
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "ontnode")}
        draggable
      >
        <div className="node-title">
          <h1>ONT</h1>
        </div>
        <div className="node-icon">
        <div class="ont">
          <div class="ont-body">
            <div class="ont-display"></div>
            <div class="ont-connector"></div>
          </div>
        </div>
        </div>

      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "splitter")}
        draggable
      >
        <div className="node-title">
          <h1>SPLITTER</h1>
        </div>
        <div className="node-icon">
          <div class="splitter">
            <div class="splitter-body">
            <div class="splitter-connector input"></div>
            <div class="splitter-connector output"></div>
          </div>
        </div>
        </div>
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "tap")}
        draggable
      >
        <div className="node-title">
          <h1>TAP</h1>
        </div>
        <div className="node-icon">
          <div class="tap">
            <div class="tap-body">
            <div class="tap-connector input"></div>
            <div class="tap-connector output"></div>
            <div class="tap-connector output-2"></div>
          </div>
        </div>
        </div>
      </div>
      <div className='description2'>
        Edit span
      </div>
      <div className="dndlink">
        <Link to="/span" className="node-link">SPAN</Link>
      </div>
      <div className='description2'>
        Edit Taps
      </div>
      <div className="dndlink">
        <Link to="/taps" className="node-link">TAP</Link>
      </div>
      <div className='description2'>
        Edit Splitters
      </div>
      <div className="dndlink">
        <Link to="/split" className="node-link">SPLITTER</Link>
      </div>
    </aside>
  )
}
