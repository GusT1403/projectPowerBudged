import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useOnt } from "../context/OntContext"
import { useNavigate, useParams } from "react-router-dom"

function OntForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const {deleteOnt, getOnt, updateOnt } = useOnt()
  const navigate = useNavigate()
  const params = useParams()
  console.log(params)
  useEffect(() => {
    async function loadOnt() {
      if (params.id) {
        const ont = await getOnt(params.id)
        setValue("sensitivity", ont.sensitivity)
        setValue("overload", ont.overload)
      }
    }
    loadOnt()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    const sensitivityValid = !isNaN(data.sensitivity)
    const overloadValid = !isNaN(data.overload)

    if (!sensitivityValid || !overloadValid) {
      setError("sensitivity", { type: "manual", message: "Invalid number" })
      setError("overload", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["sensitivity", "overload"])

    const sensitivity = parseFloat(data.sensitivity)
    const overload = parseFloat(data.overload)

    //const powerOut = power - connector //calculos para la atenuacion

    const newData = { sensitivity, overload }

    updateOnt(params.id, newData)

    navigate("/workarea")
  })

  const handleOutsideClick = () => {
    navigate("/workarea")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h1>Optical Network Terminal (ONT)</h1>
          <div className='input-box'>
            <label htmlFor='sensitivity'>ONT sensitivity [db]</label>
            <input
              id='sensitivity'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("sensitivity")}
              autoFocus
            />
            {errors.sensitivity && (
              <span className='error'>{errors.sensitivity.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='overload'>ONT overload [db]</label>
            <input
              id='overload'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("overload")}
            />
            {errors.overload && (
              <span className='error'>{errors.overload.message}</span>
            )}
          </div>
          <button className='btn'>Save</button>
          <button type="button" className="del-btn" onClick={(e) => {
            e.preventDefault()
            deleteOnt(params.id)
            navigate("/workarea")
          }}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default OntForm
