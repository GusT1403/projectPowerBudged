import { useEffect } from 'react'
import { useSpan } from "../context/SpanContext"
import { useBhgps } from "../context/BHgpsContext"
import { Link} from "react-router-dom"
import "../pages/card.css"

function SpanCard({span}) {
  const { deleteSpan } = useSpan()
  const { bhgps, getBhgpss, deleteBhgps } = useBhgps()

  useEffect(() => {
    const fetchData = async () => {
      await getBhgpss()
    }
    fetchData()
  }, [])

  const deleteAll = async () => {
    console.log(span._id)
    const Bh = bhgps.filter((gps) => gps.span === span._id)
    console.log(Bh)

    const deletePromises = Bh.map((gps) => deleteBhgps(gps._id))

    try {
      await Promise.all(deletePromises)
      await getBhgpss()
      console.log("Todos los elementos bhgps eliminados.")
    } catch (error) {
      console.error("Error al eliminar los elementos bhgps:", error)
    }

    await deleteSpan(span._id)
    console.log(`Span ${span._id} y todos sus elementos bhgps asociados han sido eliminados.`)
  }

  return (
    <div className='card'>
      <h1 className='name'>{span.name}</h1>
      <p className='description'>{span.description}</p>
      <div className='actions'>
        <button type='button' className='action-del'
        onClick={deleteAll}
        >Del</button>
        <Link to={`/span/${span._id}`} className='action-edit'>Edit</Link>
      </div>
    </div>
  )
}

export default SpanCard