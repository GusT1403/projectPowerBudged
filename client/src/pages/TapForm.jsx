import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useTap } from "../context/TapContext"
import { useTaps } from "../context/TapsContext"
import { useNavigate, useParams } from "react-router-dom"

function TapForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const { tap, deleteTap, getTap, updateTap } = useTap()
  const { taps, getTapss } = useTaps()
  const navigate = useNavigate()
  const params = useParams()
  const [ selectedTaps, setSelectedTaps ] = useState("")

  useEffect(() => {
    async function loadTap() {
      if (params.id) {
        const tap = await getTap(params.id)
        setValue("configuration", tap.configuration)
        setValue("insert", tap.insert)
        setValue("tap", tap.tap)
        await getTapss()
      }
    }
    loadTap()
  }, [])

  const powerIn = parseFloat(tap[0].powerIn)

  const handleSelect = (event) => {
    const selectedId = event.target.value
    setSelectedTaps(event.target.value)
    const selectedTaps = taps.find(tapss => tapss._id === selectedId )
    setValue("configuration", selectedTaps.configuration)
    setValue("insert", selectedTaps.insert)
    setValue("tap", selectedTaps.tap)
  }

  const onSubmit = handleSubmit(async (data) => {
    const insertValid = !isNaN(data.insert)
    const tapValid = !isNaN(data.tap)

    if (!insertValid || !tapValid) {
      setError("insert", { type: "manual", message: "Invalid number" })
      setError("tap", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["insert", "tap"])
    
    const configuration = data.configuration
    const insert = parseFloat(data.insert)
    const tap = parseFloat(data.tap)
    const tapout = (powerIn - tap)
    const insertout = (powerIn - insert)
    const newData = { configuration, insert, tap, tapout, insertout }
    updateTap(params.id, newData)

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
          <h1>Unbalanced splitter (TAP)</h1>
          <div className="combo-box">
            <select id="configuration" value={selectedTaps} onChange={handleSelect} autoFocus>
            <option value="">Select config</option>
              {taps.map((tapss) => (
                <option key={tapss._id} value={tapss._id}>{tapss.configuration}  {tapss.description}</option>
              ))}
            </select>
          </div>
          <div className='input-box2'>
            <label htmlFor='configuration'>Configuration</label>
            <input
              id='configuration'
              type='text'
              disabled
              placeholder='TAP config [db]'
              {...register("configuration")}
              autoFocus
            />
            {errors.configuration && (
              <span className='error'>{errors.configuration.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='insert'>INSERT [db]</label>
            <input
              id='insert'
              type='text'
              disabled
              placeholder='INSERT up insert loss [db]'
              {...register("insert")}
              autoFocus
            />
            {errors.insert && (
              <span className='error'>{errors.insert.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='tap'>TAP [db]</label>
            <input
              id='tap'
              type='text'
              disabled
              placeholder='TAP down insert loss [db]'
              {...register("tap")}
            />
            {errors.tap && (
              <span className='error'>{errors.tap.message}</span>
            )}
          </div>
          <button className='btn2'>Save</button>
          <button type="button" className="del-btn" onClick={(e) => {
            e.preventDefault()
            deleteTap(params.id)
            navigate("/workarea")
          }}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default TapForm