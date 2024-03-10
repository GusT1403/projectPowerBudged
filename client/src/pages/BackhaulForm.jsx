import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useBackhaul } from "../context/BackhaulContext"
import { useOlt } from "../context/OltContext"
import { useSplitter } from "../context/SplitterContext"
import { useTap } from "../context/TapContext"
import { useSpan } from "../context/SpanContext"
import { useNavigate, useParams } from "react-router-dom"

function BackhaulForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const { backhaul, getBackhaul, updateBackhaul } = useBackhaul()
  const { span, getSpans} = useSpan()
  const navigate = useNavigate()
  const params = useParams()
  const [ selectedSpan, setSelectedSpan ] = useState("")

  useEffect(() => {
    async function loadBackhaul() {
      if (params.id) {
        const backhaul = await getBackhaul(params.id)
        setValue("attenuation", backhaul.attenuation)
        setValue("cablesd", backhaul.cablesd)
        setValue("cablesr", backhaul.cablesr)
        setValue("odistance", backhaul.odistance)
        setValue("distance", backhaul.distance)
      }
      await getSpans()
    }
    loadBackhaul()
  }, [])

  const handleSelect = (event) => {
    const selectedId = event.target.value
    setSelectedSpan(event.target.value)
    const selectedSpan = span.find(spans => spans._id === selectedId)
    const distanceMeters = parseFloat(selectedSpan.distance) * 1000
    setValue("distance", distanceMeters)
  }

  const onSubmit = handleSubmit(async (data) => {
    const attenuationValid = !isNaN(data.attenuation)
    const cablesdValid = !isNaN(data.cablesd)
    const cablesrValid = !isNaN(data.cablesr)
    const odistanceValid = !isNaN(data.odistance)
    const distanceValid = !isNaN(data.distance)

    if (
      !attenuationValid ||
      !cablesdValid ||
      !cablesrValid ||
      !odistanceValid ||
      !distanceValid
    ) {
      setError("attenuation", { type: "manual", message: "Invalid number" })
      setError("cablesd", { type: "manual", message: "Invalid number" })
      setError("cablesr", { type: "manual", message: "Invalid number" })
      setError("odistance", { type: "manual", message: "Invalid number" })
      setError("distance", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["attenuation", "cablesd", "cablesr", "odistance", "distance"])

    const attenuation = parseFloat(data.attenuation)
    const cablesd = parseFloat(data.cablesd)
    const cablesr = parseFloat(data.cablesr)
    const odistance = parseFloat(data.odistance)
    const distance = parseFloat(data.distance)
    

    const powerOut = attenuation - cablesd
    const newData = { attenuation, cablesd, cablesr, odistance, distance, powerOut,}

    updateBackhaul(params.id, newData)

    navigate("/workarea")
  })

  const handleOutsideClick = () => {
    navigate("/workarea")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <div className="close" onClick={handleOutsideClick}>
        x
      </div>
        <form onSubmit={onSubmit}>
          <h1>Backhaul link</h1>
          <div className='input-box2'>
            <label htmlFor='attenuation'>Fiber optic Attenuation [db/Km]</label>
            <input
              id='attenuation'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("attenuation")}
              autoFocus
            />
            {errors.attenuation && (
              <span className='error'>{errors.attenuation.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='cablesd'>Cable storage Distance [m]</label>
            <input
              id='cablesd'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("cablesd")}
            />
            {errors.cablesd && (
              <span className='error'>{errors.cablesd.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='cablesr'>Remaining cable storage [m]</label>
            <input
              id='cablesr'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("cablesr")}
            />
            {errors.cablesr && (
              <span className='error'>{errors.cablesr.message}</span>
            )}
          </div>
          <div className="combo-box">
            <label htmlFor='cablesr'>Select distance options</label>
            <select id="span-select" value={selectedSpan} onChange={handleSelect} >
              <option value="">Entry manually</option>
              {span.map((spans) => (
                <option key={spans._id} value={spans._id}>{spans.name}</option>
              ))}
            </select>
          </div>
          <div className='input-box2'>
            <label htmlFor='distance'>Total Distance [m]</label>
            <input
              id='distance'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("distance")}
            />
            {errors.distance && (
              <span className='error'>{errors.distance.message}</span>
            )}
          </div>
          <button className='btn2'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default BackhaulForm