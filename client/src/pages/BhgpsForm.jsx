import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useBhgps } from "../context/BHgpsContext"
import { useNavigate, useLocation, useParams, Link } from "react-router-dom"
import "../pages/form.css"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function bhgpsForm() {

  const { register, handleSubmit, setValue } = useForm()
  const { getBhgps, createBhgps, updateBhgps} = useBhgps()
  const navigate = useNavigate()
  const params = useParams()
  let query = useQuery()
  let spanId = query.get('id')
  let spanLength = query.get('length')
  console.log(params) 
  useEffect(() => {
    async function loadBhgps() {
      if (params.id) {
        const bhgps = await getBhgps(params.id)
        setValue("latitude", bhgps.lat)
        setValue("longitude", bhgps.lon)
        spanId = bhgps.span
      }
    }
    loadBhgps()
  }, [])

  const getCoordinates = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setValue("latitude", latitude)
        setValue("longitude", longitude)
      }, (error) => { alert('Error getting user location:'), console.error('Error getting user location:', error)})
    }
    else {
      alert('Geolocation is not supported by this browser.')
      console.error('Geolocation is not supported by this browser.');
    }
  }
  const onSubmit = handleSubmit(async (data) => {
    if(params.id) {
      const lat = data.latitude
      const lon = data.longitude
      const newData = { lat, lon }
      console.log(newData)
      updateBhgps(params.id, newData)
    }
    else {
      const lat = parseFloat(data.latitude)
      const lon = parseFloat(data.longitude)
      const span = spanId
      const pointer = parseInt(spanLength) - 1
      const bhtype = 'pole'
      const newData = { span, bhtype, lat, lon, pointer }
      console.log(newData)
      createBhgps(newData)
    }
    navigate(`/span/${spanId}`)
  })

  const handleOutsideClick = () => {
    navigate(`/span/${spanId}`)
  }

  return (
    <div className='content2' onClick={handleOutsideClick}>
      <div className='wrapper2' onClick={(e) => e.stopPropagation()}>
        <button onClick={getCoordinates} className='gps-coords'>Get Coordinates</button>
        <form onSubmit={onSubmit}>
          <div className='input-box'>
            <label htmlFor="">Latitude</label>
            <input id='latitude' type='text' {...register("latitude")}/>
          </div>
          <div className='input-box'>
            <label htmlFor="">Longitude</label>
            <input id='longitude' type='text' {...register("longitude")}/>
          </div>
            
          <button className='btn'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default bhgpsForm