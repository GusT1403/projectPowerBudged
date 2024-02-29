import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSpan } from "../context/SpanContext"
import { useBhgps } from "../context/BHgpsContext"
import { useNavigate, useParams, Link } from "react-router-dom"
import BhgpsCard from "../pages/BhgpsCard"
import "../pages/span.css"

function SpanForm() {
  const { register, handleSubmit, setValue } = useForm()

  const { getSpan, createSpan, updateSpan } = useSpan()
  const { getBhgpss, createBhgps, updateBhgps, bhgps } = useBhgps()

  const navigate = useNavigate()
  const params = useParams()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [attempt, setAttempt] = useState(false)
  const [spanBh, setSpanBh] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await getBhgpss()
      setHasLoaded(true)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if(hasLoaded) {
      const Bh = bhgps.filter((gps) => gps.span === params.id)
      setSpanBh(Bh)
      if(!attempt && Bh.length === 0) {
        
        setAttempt(true)
        const span = params.id
        const newStart = { span, bhtype: "start", lat: 0, lon: 0, pointer: 0 }
        const newEnd = { span, bhtype: "end", lat: 0, lon: 0, pointer: 1 }

        const createData = async () => {
          await createBhgps(newStart)
          await createBhgps(newEnd)
          await getBhgpss()
        }
      createData()
    }
    const end = Bh.filter((gps) => gps.bhtype === 'end')
    if (!attempt && end.length != 0) {
        setAttempt(true)
        const len = parseInt(Bh.length) - 1
        const updateData = async () => {
          await updateBhgps(end[0]._id, { pointer: len })
          await getBhgpss()
        }
        updateData()
      }
      Bh.sort((a, b) => a.pointer - b.pointer)
      const haversineDistance = (latA, lonA, latB, lonB) => {
        const R = 6371//Earth Radius [km]
        const dLat = (latB - latA) * (Math.PI / 180)
        const dLon = (lonB - lonA) * (Math.PI / 180)
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(latA * (Math.PI / 180)) *
                  Math.cos(latB * (Math.PI / 180)) * 
                  Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c
        return distance //Distance[km]
      }
      const totalDistance = (bh) => {
        let totalDistance = 0
        for (let i = 0; i < bh.length - 1; i++) {
          const current = bh[i]
          const next = bh[i + 1]
          if(current.lat === 0 || current.lon === 0 || next.lat === 0 || next.lon === 0){
            totalDistance = 0
          } else {
            const distance = haversineDistance(current.lat, current.lon, next.lat, next.lon)
            totalDistance += distance
          }
        }
        return totalDistance
      }

      if (Bh.length != 0) {
        const distance = totalDistance(spanBh)
        console.log(`Distance: ${distance} km`)
        const updateData = async () => {
          await updateSpan(params.id, { distance: distance })
        }
        updateData()
      }
    }
  }, [hasLoaded, bhgps, attempt])

  useEffect(() => {
    async function loadSpan() {
      if (params.id) {
        const span = await getSpan(params.id)
        setValue("name", span.name)
        setValue("description", span.description)
      }
    }
    loadSpan()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateSpan(params.id, data)
    } else {
      const distance = 0
      const newdata = {
        name: data.name,
        description: data.description,
        distance
      } 
      createSpan(newdata)
    }
    navigate("/span")
  })
  const handleOutsideClick = () => {
    navigate("/span")
  }
  return (
    <div className='content3' onClick={handleOutsideClick}>
      <div className='wrapper3' onClick={(e) => e.stopPropagation()}>
        <form className='span-form' onSubmit={onSubmit}>
          <div className='input-span'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Name'
              {...register("name")}
              autoFocus
            />
          </div>
          <div className='input-des'>
            <label htmlFor='name'>Description</label>
            <input
              id='description'
              type='text'
              placeholder='Description'
              {...register("description")}
            ></input>
          </div>
          <button className='btn-span'>Save</button>
        </form>
        <div className='bhgps'>
          <div className='addbhgps'>
            <Link
              to={`/addbhgps?id=${params.id}&length=${spanBh.length}`}
              className='add-bhgps'
            >
              Add coordinates
            </Link>
          </div>
          <div className='list-bhgps'>
            {spanBh
              .sort((a, b) => a.pointer - b.pointer)
              .map((gps) => (
                <BhgpsCard gps={gps} key={gps._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpanForm
