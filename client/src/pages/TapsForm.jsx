import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "./nodesForm.css"
import { useTaps } from "../context/TapsContext"
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
  const { deleteTaps, getTaps, updateTaps, createTaps } = useTaps()
  const navigate = useNavigate()
  const params = useParams()
  console.log(params)
  useEffect(() => {
    async function loadTaps() {
      if (params.id) {
        const taps = await getTaps(params.id)
        setValue("configuration", taps.configuration)
        setValue("insert", taps.insert)
        setValue("tap", taps.tap)
        setValue("description", taps.description)
      }
    }
    loadTaps()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
   if(params.id){
    console.log(params)
    updateTaps(params.id, data)
   } else{
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
    const description = data.description

    const newData = { configuration, insert, tap, description }
    console.log(newData)
    createTaps(newData)
   }

    navigate("/taps")
  })

  const handleOutsideClick = () => {
    navigate("/taps")
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h1>Optical Network Terminal (TAP)</h1>
          <div className="combo-box">
            <select id="configuration" type='text' {...register("configuration")} autoFocus>
              <option value="">Configuration</option>
              <option value="01|99">01|99</option>
              <option value="02|98">02|98</option>
              <option value="05|95">05|95</option>
              <option value="10|90">10|90</option>
              <option value="15|85">15|85</option>
              <option value="20|80">20|80</option>
              <option value="25|75">25|75</option>
              <option value="30|70">30|70</option>
              <option value="35|65">35|65</option>
              <option value="40|60">40|60</option>
              <option value="45|55">45|55</option>
            </select>
            {errors.configuration && (
              <span className='error'>{errors.configuration.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='insert'>INSERT up insert loss [db]</label>
            <input
              id='insert'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("insert")}
              autoFocus
            />
            {errors.insert && (
              <span className='error'>{errors.insert.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='tap'>TAP down insert loss [db]</label>
            <input
              id='tap'
              type='text'
              placeholder='decimal number separated by a dot'
              {...register("tap")}
            />
            {errors.tap && (
              <span className='error'>{errors.tap.message}</span>
            )}
          </div>
          <div className='input-box2'>
            <label htmlFor='description'>Short description</label>
            <input
              id='description'
              type='text'
              placeholder='Short description'
              {...register("description")}
            />
          </div>
          <button className='btn2'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default TapsForm