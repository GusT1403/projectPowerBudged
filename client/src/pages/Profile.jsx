import {useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

function Profile() {

  const { setValue, register } = useForm()
  const navigate = useNavigate()
  const{user} = useAuth()


useEffect(() => {
  setValue("username", user.username)
  setValue("email", user.email)
}, [user.username, user.email]);

  const handleOutsideClick = () => {
    navigate("/")
  }

  return (
    <div className='profile' onClick={handleOutsideClick}>
      <div className='wrap-profile' onClick={(e) => e.stopPropagation()}>
        <div className="closer" onClick={handleOutsideClick}>
        x
      </div>
        <form>
          <h1>User</h1>
          <div className='input-prof'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              placeholder='username'
              disabled
              {...register("username")}
              autoFocus
            />
          </div>
          <div className='input-prof'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='text'
              placeholder='email'
              disabled
              {...register("email")}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
