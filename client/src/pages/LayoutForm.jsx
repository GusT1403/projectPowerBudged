import { useForm } from 'react-hook-form'
import './form.css'
import { useLayouts } from '../context/LayoutContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function LayoutForm() {

  const { register, handleSubmit, setValue } = useForm()
  const { createLayout, getLayout, updateLayout } = useLayouts()
  const navegate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadLayout() {
      if (params.id) {
        const layout = await getLayout(params.id)
        setValue('title', layout.title)
        setValue('description', layout.description)
      }
    }
    loadLayout()
  }, [])

  const onSubmit = handleSubmit((data) => {
    if(params.id) {
      updateLayout(params.id, data)
    }else {
      createLayout(data)
    }
    navegate('/layouts')
  })

  return (
    <div className='content'>
      <div className='wrapper'>
        <form onSubmit={onSubmit}>
          <div className='input-box'>
            <input type="text" placeholder='Title' {...register("title")} autoFocus />
          </div>
          <div className='textarea-box'>
            <textarea rows="3" placeholder='Description' {...register("description")} ></textarea>
          </div>
          <button className='btn'>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default LayoutForm
