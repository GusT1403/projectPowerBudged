import { useForm } from 'react-hook-form'
import './form.css'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const {signin, errors: signinErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(() => {
    if(isAuthenticated){
      navigate("/workarea")
    }
  }, [isAuthenticated])

  return (
    <div className='content'>
      <div className='wrapper'>
      {
        signinErrors.map((error, i) => (
          <div className='error' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="box">
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
        <button type="submit" className="btn">Login</button>
      </form>
      <div className='register-link'>
        <p>Don't have an account? <Link to="/register" className='a'>Sign up</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage