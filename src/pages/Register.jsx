import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useAuth } from '../contexts/AuthContext'


const Register = () => {

    // const [user, setUser] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const { handleSubmit, formState: { errors }, register } = useForm()
    const { registerUser, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // setIsLoading(true)
        if (user !== null) {
            navigate('/')
        } else {
            setIsLoading(false)
        }
    }, [user])





    return (
        <section className='form-component'>
            {isLoading ?
                <Loader />
                :
                <>
                    <h4 className='title-register'>Crea tu cuenta para empezar a registrar tus issues</h4>
                    <form className='form' onSubmit={handleSubmit((data) => {
                        registerUser(data, navigate, setIsLoading)
                    })}>
                        {/* USUARIO */}
                        <div>
                            <label htmlFor='username'>Nombre de usuario</label>
                            <input {...register('username', {
                                required: 'Este campo es obligatorio',
                                minLength: {
                                    value: 3,
                                    message: 'El mínimo de caracteres es 3'
                                }
                            })} onChange={() => { errors.username = {} }} id="user" type='text' />
                            {errors?.username?.message && <p className='error'>{errors.username.message}</p>}
                            {/* {errors.username.required && <p className='error'>{errors.username.required}</p>} */}

                        </div>
                        {/* CORREO ELECTRONICO */}

                        <div>
                            <label htmlFor='email'>Correo electrónico</label>
                            <input {...register('email', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido"
                                }
                            })} onChange={() => { errors.email = {} }} type='email' />
                            {/* {errors.email.required && <p className='error'>{errors.email.required}</p>} */}
                            {errors?.email?.message && <p className='error'>{errors.email.message}</p>}
                        </div>

                        {/* CONTRASEÑA */}

                        <div>
                            <label htmlFor='password'>Contraseña <span style={{ marginLeft: '5px' }} onClick={() => { setShowPassword(!showPassword) }}>{showPassword ?<FaRegEye /> : <FaRegEyeSlash /> }</span> </label>
                            <input {...register('password', {
                                required: 'Este campo es obligatorio',
                                minLength: {
                                    value: 5,
                                    message: 'El mínimo de caracteres es 5'
                                }
                            })} onChange={() => { errors.password = {} }} id='password' type={showPassword ?'text' : 'password'} />
                            {errors?.password?.message && <p className='error'>{errors.password.message}</p>}

                        </div>


                        <div>
                            <button type='submit'>Registrarse</button>
                        </div>

                        <div>
                            <p>¿Tienes una cuenta? Inicia sesión haciendo click <Link to={'/login'}>aquí</Link></p>
                        </div>
                    </form>
                </>

            }
        </section>
    )
}

export default Register
