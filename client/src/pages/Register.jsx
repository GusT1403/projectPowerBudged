import { useForm } from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import './form.css'

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const{ signup, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate("/layouts")
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async(values) => {
    signup(values)
  })

  return (
    <div className='content'>
      <div className="wrapper">
      {
        registerErrors.map((error, i) => (
          <div className='error' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <div className="box">
          <div className="input-box" >
            <input type="text" {...register("username", { required: true })} placeholder='Username' />
            {errors.username && (
              <p className='errormsg'>Username is required</p>
            )}
          </div>
          <div className="input-box" >
            <input type="email" {...register("email", { required: true })} placeholder='Email' />
            {errors.email && (
              <p className='errormsg'>Email is required</p>
            )}
          </div>
          <div className="input-box" >
            <input type="password" {...register("password", { required: true })} placeholder='Password' />
            {errors.password && (
              <p className='errormsg'>Password is required</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <div className='register-link'>
        <p>Already have an account? <Link to="/login" className='a'>Signin</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default RegisterPage