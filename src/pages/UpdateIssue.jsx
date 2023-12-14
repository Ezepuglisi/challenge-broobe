import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Menu from '../components/Menu'
import { useIssues } from '../contexts/IssuesContext'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import '../css/issues.css'

const UpdateIssue = () => {

  const [nameIssue, setNameIssue] = useState('')
  const [priority, setPriority] = useState(null)
  const [description, setDescription] = useState('')
  const [errorPriorities, setErrorPriorities] = useState(false)
  const [loadingPriorities, setLoadingPriorities] = useState(false)
  const [errorUpdateIssue, setErrorUpdateIssue] = useState(false)
  const [loadingUpdateIssue, setLoadingUpdateIssue] = useState(false)
  const [issueSelected, setIssueSelected] = useState({})

  const { getPriorities, createNewIssue, priorities, issues, getIssues, patchIssue } = useIssues()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoadingPriorities(true)

    if (!issues) {
      getIssues(setLoadingPriorities, setErrorPriorities)
    }

  }, [])

  useEffect(() => {
    setIssueSelected(issues?.find((element) => element.id === parseInt(id)))

  }, [issues])


  const handleEdit = () => {
    if (issueSelected.name === '' || issueSelected.description === '' || issueSelected.priority_id === undefined || issueSelected.name.length > 100 || issueSelected.description.length > 200) {
      setErrorUpdateIssue(true)
      return
    }

    setLoadingUpdateIssue(true)
    patchIssue(issueSelected, setLoadingUpdateIssue, toast, navigate)
  }

  return (
    <section className='create-issueComponent'>
      <Menu />

      {issueSelected && Object.keys(issueSelected).length > 0 && priorities.length > 0 && !loadingUpdateIssue ?
        <div className='container-updateIssue'>
          <div>
            <label htmlFor='name-issue'>
              Nombre del Issue
            </label>
            <input
              name='name-issue'
              value={issueSelected.name}
              onChange={(e) => {
                setIssueSelected(prevState => ({
                  ...prevState, // Copia las propiedades existentes
                  name: e.target.value // Sobrescribe la propiedad que deseas modificar
                }));
              }}
            />
            {errorUpdateIssue && issueSelected.name == '' && <p className='error'>Este campo es requerido</p>}
            {errorUpdateIssue && issueSelected.name.length > 100 && <p className='error'>El máximo de caracteres es 100</p>}

          </div>
          <div>
            <label htmlFor='description'>
              Descripción del Issue
            </label>
            <input
              name='description'
              value={issueSelected.description}
              onChange={(e) => {
                setIssueSelected(prevState => ({
                  ...prevState, // Copia las propiedades existentes
                  description: e.target.value // Sobrescribe la propiedad que deseas modificar
                }));
              }}
            />
            {errorUpdateIssue && issueSelected.description === '' && <p className='error'>Este campo es requerido</p>}
            {errorUpdateIssue && issueSelected.description.length > 200 && <p className='error'>El máximo de caracteres es 100</p>}

          </div>
          <div>
            <label htmlFor='prioridad'>
              Prioridad
            </label>
            <select
              // onChange={(e) => setPriority(e.target.value)} 
              value={issueSelected.priority_id}
              onChange={(e) => {
                setIssueSelected(prevState => ({
                  ...prevState, // Copia las propiedades existentes
                  priority_id: parseInt(e.target.value) // Sobrescribe la propiedad que deseas modificar
                }));
              }}
            >
              <option value="" disabled hidden>Selecciona una opción</option>
              {priorities?.map((element, index) => {
                return <option key={index} value={element.id}>{element.type}</option>
              })}
            </select>
            {errorUpdateIssue && issueSelected.priority_id == undefined && <p className='error'>Este campo es requerido</p>}

          </div>
          <div className='buttons'>
            <button className='success-button' onClick={() => handleEdit()}>Guardar</button>
            <button className='cancel-button' onClick={() => navigate('/')}>Cancelar</button>
          </div>
          {/* {errorUpdateIssue && <p className='error'>Hubo un error al editar el issue</p>} */}
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

export default UpdateIssue