import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useOlt } from "../context/OltContext"
import { useNavigate, useParams } from "react-router-dom"

function OltForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const { getOlt, updateOlt } = useOlt()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadOlt() {
      if (params.id) {
        const olt = await getOlt(params.id)
        setValue("power", olt.power)
        setValue("connector", olt.connector)
        setValue("coupler", olt.coupler)
        setValue("fusion", olt.fusion)
        setValue("maxDistance", olt.maxDistance)
      }
    }
    loadOlt()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    const powerValid = !isNaN(data.power)
    const connectorValid = !isNaN(data.connector)
    const couplerValid = !isNaN(data.coupler)
    const fusionValid = !isNaN(data.fusion)
    const maxDistanceValid = !isNaN(data.maxDistance)

    if (
      !powerValid ||
      !connectorValid ||
      !couplerValid ||
      !fusionValid ||
      !maxDistanceValid
    ) {
      setError("power", { type: "manual", message: "Invalid number" })
      setError("connector", { type: "manual", message: "Invalid number" })
      setError("coupler", { type: "manual", message: "Invalid number" })
      setError("fusion", { type: "manual", message: "Invalid number" })
      setError("maxDistance", { type: "manual", message: "Invalid number" })
      return
    }

    clearErrors(["power", "connector", "coupler", "fusion", "maxDistance"])

    const power = parseFloat(data.power)
    const connector = parseFloat(data.connector)
    const coupler = parseFloat(data.coupler)
    const fusion = parseFloat(data.fusion)
    const maxDistance = parseFloat(data.maxDistance)

    const powerOut = power - connector
    const newData = { power, connector, coupler, fusion, maxDistance, powerOut }

    updateOlt(params.id, newData)

    navigate("/workarea")
  })

  const handleOutsideClick = () => {
    navigate("/workarea")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h1>Optical Line Terminal (OLT)</h1>
          <div className='input-box'>
            <label htmlFor='power'>OLT power [dbm]</label>
            <input
              id='power'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("power")}
              autoFocus
            />
            {errors.power && (
              <span className='error'>{errors.power.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='connector'>Connector loss [db]</label>
            <input
              id='connector'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("connector")}
            />
            {errors.connector && (
              <span className='error'>{errors.connector.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='coupler'>Coupler duplex adapter loss [db]</label>
            <input
              id='coupler'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("coupler")}
            />
            {errors.coupler && (
              <span className='error'>{errors.coupler.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='fusion'>Fusion or splice loss [db]</label>
            <input
              id='fusion'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("fusion")}
            />
            {errors.fusion && (
              <span className='error'>{errors.fusion.message}</span>
            )}
          </div>
          <div className='input-box'>
            <label htmlFor='maxDistance'>Maximum link distance [km]</label>
            <input
              id='maxDistance'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("maxDistance")}
            />
            {errors.maxDistance && (
              <span className='error'>{errors.maxDistance.message}</span>
            )}
          </div>
          <button className='btn'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default OltForm
