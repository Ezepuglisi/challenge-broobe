import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa6";
import { useAuth } from '../contexts/AuthContext';



const Login = () => {

  const [isLoading, setIsLoading] = useState(true)
  const { handleSubmit, formState: { errors }, register } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [errorFindUser, setErrorFindUser] = useState(false)

  const {login, user} = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    // setIsLoading(true)
    if(user !== null){
      navigate('/')
    }else{
      setIsLoading(false)
    }
  }, [user])



  return (
    <section className='form-component'>
      {isLoading ?
        <Loader />
        :
        <>
          <h4 className='title-register'>¡Bienvenido de nuevo!</h4>
          <form className='form' onSubmit={handleSubmit((data) => {
            errorFindUser && setErrorFindUser(false)
            login(data, setErrorFindUser, setIsLoading, navigate)
          })}>
            {/* USUARIO */}
            <div>
              <label htmlFor='username'>Email</label>
              <input {...register('username', {
                required: 'Este campo es obligatorio',
              })} onChange={() => { errors.username = {} }} id="user" type='text' />
              {errors?.username?.message && <p className='error'>{errors.username.message}</p>}
              {/* {errors.username.required && <p className='error'>{errors.username.required}</p>} */}

            </div>

            {/* CONTRASEÑA */}

            <div>
              <label htmlFor='password'>Contraseña <span style={{marginLeft:'5px'}} onClick={() => {setShowPassword(!showPassword)}}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span> </label>
              <input {...register('password', {
                required: 'Este campo es obligatorio',
              })} onChange={() => { errors.password = {} }} id='password' type={showPassword ? 'text':'password'} />

              {errors?.password?.message && <p className='error'>{errors.password.message}</p>}
              {errorFindUser &&<p className='error'>Usuario o contraseña incorrecto</p>}

            </div>
            

            <div>
              <button type='submit'>Iniciar sesión</button>
            </div>

            <div>
              <p>¿No tienes una cuenta? Crea una haciendo click <Link to={'/register'}>aquí</Link></p>
            </div>
          </form>
        </>

      }
    </section>
  )
}

export default Login
