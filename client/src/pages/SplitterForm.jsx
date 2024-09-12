import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useSplitter } from "../context/SplitterContext"
import { useSplit } from "../context/SplitContext"
import { useNavigate, useParams } from "react-router-dom"

function SplitterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const { splitter, deleteSplitter, getSplitter, updateSplitter } = useSplitter()
  const{ split, getSplits} = useSplit()
  const navigate = useNavigate()
  const params = useParams()
  const [ selectedSplit, setSelectedSplit] = useState("")
  let powerIn = 0

  useEffect(() => {
    async function loadSplitter() {
      if (params.id) {
        const splitter = await getSplitter(params.id)
        setValue("configuration", splitter.configuration)
        setValue("loss", splitter.loss)
        await getSplits()
      }
    }
    loadSplitter()
  }, [])

   for (let i = 0; i < splitter.length; i++) {
    if(splitter[i]._id === params.id)
    {
      powerIn = parseFloat(splitter[i].powerIn)
    }
} 

  const handleSelect = (event) => {
    const selectedId = event.target.value
    setSelectedSplit(event.target.value)
    const selectedSplit = split.find(splits => splits._id === selectedId)
    setValue("configuration", selectedSplit.configuration)
    setValue("loss", selectedSplit.loss)
  }

  const onSubmit = handleSubmit(async (data) => {
    const lossValid = !isNaN(data.loss)

    if (!lossValid) {
      setError("loss", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["loss"])
    console.log(powerIn)
    const configuration = data.configuration
    const loss = parseFloat(data.loss)
    const out = powerIn - loss
    const newData = { configuration, loss, out}
    updateSplitter(params.id, newData)

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
          <h1>Splitter (NAP)</h1>
          <div className="combo-box">
            <select id="configuration" value={selectedSplit} onChange={handleSelect} autoFocus>
            <option value="">Select config</option>
              {split.map((split) => (
                <option key={split._id} value={split._id}>{split.configuration}  {split.description}</option>
              ))}
            </select>
          </div>
          <div className='input-box2'>
            <label htmlFor='configuration'>Configuration</label>
            <input
              id='configuration'
              type='text'
              disabled
              placeholder='SPLIT config [db]'
              {...register("configuration")}
              autoFocus
            />
            {errors.configuration && (
              <span className='error'>{errors.configuration.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='loss'>Splitter loss [dB]</label>
            <input
              id='loss'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("loss")}
            />
            {errors.loss && (
              <span className='error'>{errors.loss.message}</span>
            )}
          </div>
          <button className='btn2'>Save</button>
          <button type="button" className="del-btn" onClick={(e) => {
            e.preventDefault()
            deleteSplitter(params.id)
            navigate("/workarea")
          }}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default SplitterForm
