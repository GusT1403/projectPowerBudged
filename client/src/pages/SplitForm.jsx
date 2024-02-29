import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useSplit } from "../context/SplitContext"
import { useNavigate, useParams } from "react-router-dom"

function TapsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const { deleteSplit, getSplit, updateSplit, createSplit } = useSplit()
  const navigate = useNavigate()
  const params = useParams()
  console.log(params)
  useEffect(() => {
    async function loadSplit() {
      if (params.id) {
        const split = await getSplit(params.id)
        setValue("configuration", split.configuration)
        setValue("loss", split.loss)
        setValue("description", split.description)
      }
    }
    loadSplit()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
   if(params.id){
    console.log(params)
    updateSplit(params.id, data)
   } else{
    const lossValid = !isNaN(data.loss)

    if (!lossValid) {
      setError("loss", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["loss"])

    const configuration = data.configuration
    const loss = parseFloat(data.loss)
    const description = data.description

    const newData = { configuration, loss, description }
    console.log(newData)
    createSplit(newData)
   }

    navigate("/split")
  })

  const handleOutsideClick = () => {
    navigate("/split")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h1>Splitter Configuration</h1>
          <div className="combo-box">
            <select id="configuration" type='text' {...register("configuration")} autoFocus>
              <option value="">Configuration</option>
              <option value="1/2">1/2</option>
              <option value="1/4">1/4</option>
              <option value="1/8">1/8</option>
              <option value="1/16">1/16</option>
              <option value="1/32">1/32</option>
              <option value="1/64">1/64</option>
            </select>
            {errors.configuration && (
              <span className='error'>{errors.configuration.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='iloss'>Max insert loss [dB]</label>
            <input
              id='loss'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("loss")}
              autoFocus
            />
            {errors.loss && (
              <span className='error'>{errors.loss.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='description'>Short description</label>
            <input
              id='description'
              type='text'
              placeholder='Short description'
              {...register("description")}
            />
          </div>
          <button className='btn'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default TapsForm