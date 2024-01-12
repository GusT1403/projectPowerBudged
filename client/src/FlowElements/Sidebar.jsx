import React from "react"

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the panel on the right.
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "ontnode")}
        draggable
      >
        <img className='onticon' src='..\FTTx-project ont.png' alt='' />
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "splitter")}
        draggable
      >
        <img className='spliticon' src='..\FTTx-project splitter.png' alt='' />
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "tap")}
        draggable
      >
        <img className='tapicon' src='..\FTTx-project tap.png' alt='' />
      </div>
    </aside>
  )
}
