import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useSplitter } from "../context/SplitterContext"
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
  const { deleteSplitter, getSplitter, updateSplitter } = useSplitter()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadSplitter() {
      if (params.id) {
        const splitter = await getSplitter(params.id)
        setValue("configuration", splitter.configuration)
        setValue("out", splitter.out)
      }
    }
    loadSplitter()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    const outValid = !isNaN(data.out)

    if (!outValid) {
      setError("out", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["out"])

    const configuration = data.configuration
    const out = parseFloat(data.out)

    const newData = { configuration, out}

    updateSplitter(params.id, newData)

    navigate("/workarea")
  })

  const handleOutsideClick = () => {
    navigate("/workarea")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h1>Splitter</h1>
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
            <label htmlFor='out'>SPLITTER out [db]</label>
            <input
              id='out'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("out")}
            />
            {errors.out && (
              <span className='error'>{errors.out.message}</span>
            )}
          </div>
          <button className='btn'>Save</button>
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
