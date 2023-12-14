import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { useIssues } from '../contexts/IssuesContext'
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import '../css/issues.css'

const CreateIssue = () => {

  const [nameIssue, setNameIssue] = useState('')
  const [priority, setPriority] = useState(null)
  const [description, setDescription] = useState('')
  const [errorPriorities, setErrorPriorities] = useState(false)
  const [loadingPriorities, setLoadingPriorities] = useState(false)
  const [errorCreateIssue, setErrorCreateIssue] = useState(false)
  const [loadingCreateIssue, setLoadingCreateIssue] = useState(false)

  const { getPriorities, createNewIssue, priorities } = useIssues()
  const navigate = useNavigate()

  useEffect(() => {
    setLoadingPriorities(true)
    getPriorities(setErrorPriorities, setLoadingPriorities)
  }, [])

  const handleCreateNewIssue = () => {
    console.log(description.length)
    if (nameIssue === '' || description === '' || priority === null || description.length > 201 || nameIssue.length > 100) {
      setErrorCreateIssue(true)
      return
    }
    setLoadingCreateIssue(true)
    createNewIssue(nameIssue, description, priority, setLoadingCreateIssue, toast, setErrorCreateIssue, navigate)

  }


  return (

      <section className='create-issueComponent'>
        <Menu />

        {/* {loadingCreateIssue && <Loader />} */}
        {priorities.length > 0 && !loadingCreateIssue ?
          <div className='container-createIssue'>
            <div>
              <label htmlFor='name-issue'>
                Nombre del Issue
              </label>
              <input name='name-issue' value={nameIssue} onChange={(e) => setNameIssue(e.target.value)} />
              {errorCreateIssue && nameIssue === '' && <p className='error'>Este campo es requerido</p>}
              {errorCreateIssue && nameIssue.length > 100 && <p className='error'>El máximo de caracteres es 100</p>}
            </div>
            <div>
              <label htmlFor='description'>
                Descripción del Issue
              </label>
              <input name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
              {errorCreateIssue && description === '' && <p className='error'>Este campo es requerido</p>}
              {errorCreateIssue && description.length > 100 && <p className='error'>El máximo de caracteres es 200</p>}

            </div>
            <div>
              <label htmlFor='prioridad'>
                Prioridad
              </label>
              <select onChange={(e) => setPriority(e.target.value)} value={priority || ''}>
                <option value="" disabled hidden>Selecciona una opción</option>
                {priorities?.map((element, index) => {
                  return <option key={index} value={element.id}>{element.type}</option>
                })}
              </select>
              {errorCreateIssue && priority === null && <p className='error'>Este campo es requerido</p>}

            </div>
            <div>
              <button onClick={() => handleCreateNewIssue()}>Crear Issue</button>
            </div>
          </div>
          :
          <Loader />
        }
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>

  )
}

export default CreateIssue